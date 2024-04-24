import { Injectable } from '@angular/core';
import { DataResult, orderBy, process, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { clients } from './clients-generator';

@Injectable()
export class ClientService {
    public getClients(
        skip: number,
        pageSize: number,
        sortDescriptor: SortDescriptor[],
        filterTerm: number | null
    ): Observable<DataResult> {
        let data;
        if (filterTerm) {
            data = process(orderBy(clients, sortDescriptor), {
                filter: {
                    logic: 'and',
                    filters: [
                        {
                            field: 'ID',
                            operator: 'eq',
                            value: filterTerm
                        }
                    ]
                }
            }).data;
        } else {
            data = orderBy(clients, sortDescriptor);
        }
        return of({
            data: data.slice(skip, skip + pageSize),
            total: data.length
        });
    }
}
