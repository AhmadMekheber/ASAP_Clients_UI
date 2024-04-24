import { Client } from './data.clients'; // Assuming your Client class is in a separate file

function generateDummyClients(count: number): Client[] {
  const clients: Client[] = [];
  for (let i = 0; i < count; i++) {
    const client = new Client();
    client.ID = i + 1; // Set unique ID for each client
    client.FirstName = generateRandomString(10); // Generate random first name
    client.LastName = generateRandomString(15); // Generate random last name
    client.Email = `${client.FirstName.toLowerCase()}.${client.LastName.toLowerCase()}@example.com`; // Generate random email
    client.PhoneNumber = generateRandomPhoneNumber(); // Generate random phone number (optional)
    clients.push(client);
  }
  return clients;
}

function generateRandomString(length: number): string {
  // This function generates a random string of the specified length
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomPhoneNumber(): string {
  // This function generates a random phone number in a specific format (optional)
  // You can modify this function to match your desired phone number format
  const areaCode = Math.floor(Math.random() * 900) + 100; // Generate random area code
  const prefix = Math.floor(Math.random() * 900) + 100; // Generate random prefix
  const number = Math.floor(Math.random() * 9000) + 1000; // Generate random number
  return `(${areaCode}) ${prefix}-${number}`;
}

// Example usage
export const clients = generateDummyClients(100);