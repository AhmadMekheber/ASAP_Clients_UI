import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from './client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private readonly apiUrl = 'http://localhost:5222/api/Client';

    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl);
      }

      addClient(clientData: any, callback: any, errorCallback: any): void {
        this.http.post<any>(this.apiUrl, clientData).subscribe(callback, errorCallback);
      }

      updateClient(clientID: number, clientData: any, callback: any, errorCallback: any): void {
        const url = `${this.apiUrl}/${clientID}`;
        this.http.put<any>(url, clientData).subscribe(callback, errorCallback);
      }

      deleteClient(clientID: number, callback: any, errorCallback: any): void{
        const url = `${this.apiUrl}/${clientID}`;
        this.http.delete<any>(url).subscribe(callback, errorCallback);
      }
}
