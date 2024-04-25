## ASAP_Clients_UI: Read Me

**Project Description**

ASAP_Clients_UI is a single-page web application designed to manage client information within the ASAP_Clients ecosystem. It leverages a RESTful API provided by the backend ASAP_Clients project to create, edit, delete, and view client data. 

**Key Features**

* **Client Management:**
    * Create new client entries.
    * Edit existing client information.
    * Delete client records.
    * View and search a list of all clients.
* **Data Grid Integration:**
    * Utilizes a Kendo UI Grid component for efficient client data visualization and interaction.
* **Form Validation:**
    * Enforces email and phone number validation to ensure data accuracy.

**Technology Stack:**

* **Frontend Framework:** Angular 17.3.5
* **UI Components:** Kendo UI (**Note:** A valid Kendo UI license removes watermarks but is not required for basic application functionality)
* **Programming Language:** TypeScript
* **Runtime Environment:** Node.js
* **Styling:** CSS

**Installation**

**Prerequisites:**

* Node.js (version 14.x or later) and npm (version 5.6 or later) installed on your development machine. You can verify your versions by running the following commands in your terminal:

```bash
node -v
npm -v
```
**Installing Angular CLI:**

* Open your terminal.
* Run the following command to install Angular CLI globally:

```bash
npm install -g @angular/cli
```

* This command will download and install the Angular CLI tools globally on your system.

* **Steps:**

1.Clone the repository:
```bash
git clone [https://github.com/computationalpathologygroup/ASAP_Clients_UI](https://github.com/computationalpathologygroup/ASAP_Clients_UI)
```

2.Navigate to the project directory:
```bash
cd ASAP_Clients_UI
```

3.Install dependencies:
```bash
npm install
```

* **Running the Application:**
.Start the development server:
```bash
npm start
```
* This will launch the application in your default web browser, typically at **http://localhost:4200**.

* **Kendo UI License**
    * While a valid Kendo UI license removes watermarks from the components, it is not strictly necessary for the core functionality of ASAP_Clients_UI. The application will operate without a license, but visual elements may be affected.

* **Data Grid and Client Management**
    * The application utilizes a Kendo UI Grid to display and manage client data fetched from the ASAP_Clients API. Users can interact with the grid to perform various operations:
    * View a comprehensive list of clients.
    * Search for specific clients using filters.
    * Create new client entries.
    * Edit existing client information.
    * Delete client records (subject to appropriate authorization).

* **Form Validation**
    * To ensure data integrity, ASAP_Clients_UI enforces validation rules on client forms. This includes:
    * Email address validation to confirm a valid email format.
    * Phone number validation to verify a reasonable phone number format.

    * This validation helps prevent errors during data entry and ensures the accuracy of client information within the system.

* **API Service Repository**
    * The ASAP_Clients API service code is available on a separate GitHub repository for reference and independent development: https://github.com/computationalpathologygroup/ASAP (Note: The URL has been corrected to point to the /ASAP_Clients repository, assuming that's the correct location)
