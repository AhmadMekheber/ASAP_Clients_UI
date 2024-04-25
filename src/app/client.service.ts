import { Injectable } from '@angular/core';
import { DataResult, orderBy, process, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
//import { clients } from './clients-generator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridModule, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Client } from './data.clients';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = 'http://localhost:5222/api/Client';

    constructor(private http: HttpClient) { }

    getClients(skip: number, pageSize: number, sort: any, filter: any): Observable<Client> {
        // Implement your GET method here to fetch data from the API
        const params = { skip: skip.toString(), pageSize: pageSize.toString(), sort, filter };
        return this.http.get<Client>(this.apiUrl);
      }

      addClient(clientData: any): Observable<any> {
        // Implement your POST method here to add a new client
        return this.http.post<any>(this.apiUrl, clientData);
      }

      updateClient(clientID: number, clientData: any): Observable<any> {
        // Implement your PUT method here to update an existing client
        const url = `${this.apiUrl}/${clientID}`;
        return this.http.put<any>(url, clientData);
      }

      deleteClient(clientID: number): Observable<any> {
        // Implement your DELETE method here to delete an existing client
        const url = `${this.apiUrl}/${clientID}`;
        return this.http.delete<any>(url);
      }


    // public getClients(
    //     skip: number,
    //     pageSize: number,
    //     sortDescriptor: SortDescriptor[],
    //     filterTerm: number | null
    // ): Observable<DataResult> {
    //     let data;
    //     if (filterTerm) {
    //         data = process(orderBy(clients, sortDescriptor), {
    //             filter: {
    //                 logic: 'and',
    //                 filters: [
    //                     {
    //                         field: 'ID',
    //                         operator: 'eq',
    //                         value: filterTerm
    //                     }
    //                 ]
    //             }
    //         }).data;
    //     } else {
    //         data = orderBy(clients, sortDescriptor);
    //     }
    //     return of({
    //         data: data.slice(skip, skip + pageSize),
    //         total: data.length
    //     });
    // }
}
