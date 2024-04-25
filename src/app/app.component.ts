import { Component, ViewChild } from '@angular/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NgForm, FormsModule } from '@angular/forms';
import { GridModule, GridComponent, AddEvent, EditEvent, CancelEvent, SaveEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ClientService } from "./client.service";
import { HttpClientModule } from '@angular/common/http';
import { Client } from './client';
// import { NotificationService } from '@progress/kendo-angular-notification';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GridModule, InputsModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ClientService]
})

export class AppComponent {
  @ViewChild('clientsGrid') clientsGrid: GridComponent | undefined;

  private editedRowIndex?: number = undefined;
  public editedClient?: Client;
  public itemToRemove?: Client;
  public failureMsg?: string = undefined;

  constructor(private service: ClientService) {
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.service.getClients().subscribe((data) => {
      this.gridData = data;

      this.failureMsg = undefined;
    },
      (error) => console.error(`Error fetching clients: ${error}`), // Handle errors
      () => console.log('Clients data received successfully')); // Handle completion (optional));
  }

  public addHandler(args: AddEvent, formInstance: NgForm): void {
    formInstance.reset();
    
    // close the previously edited item
    this.closeEditor();
    
    // open a new item editor
    args.sender.addRow(new Client());
  }

  public editHandler(args: EditEvent): void {
    // close the previously edited item
    this.closeEditor();
    
    // track the most recently edited row
    // it will be used in `closeEditor` for closing the previously edited row
    this.editedRowIndex = args.rowIndex;

    // clone the current - `[(ngModel)]` will modify the original item
    // use this copy to revert changes
    this.editedClient = Object.assign({}, args.dataItem);

    // edit the row
    args.sender.editRow(args.rowIndex);
  }

  public cancelHandler(args: CancelEvent): void {
    this.closeEditor();
  }

  public saveHandler(args: SaveEvent): void {
    if (this.editedClient?.id == null) {
      this.service.addClient(args.dataItem,
        (data: any) => this.saveHandlerSuccessCallback(data, args.rowIndex),
        (error: any) => this.saveHandlerErrorCallback(error)
      );
    }
    else {
      this.service.updateClient(this.editedClient.id, args.dataItem,
        (data: any) => this.saveHandlerSuccessCallback(data, args.rowIndex),
        (error: any) => this.saveHandlerErrorCallback(error)
      );
    }
  }
  private saveHandlerSuccessCallback(data: any, rowIndex: number): void {
    this.clientsGrid?.closeRow(rowIndex);
  
    this.editedRowIndex = undefined;
    this.editedClient = undefined;
  
    this.loadGridItems();
  }
  private saveHandlerErrorCallback(error: any): void {
    if (error?.error?.status == 404)
    {
      this.failureMsg = error.error.status + " - " + error.error.title;
    }
    else 
    {
      this.failureMsg = error.error;
    }
    console.log(error, "Save Error");
  }

  public removeHandler(args: RemoveEvent): void {
    this.closeEditor();

    this.itemToRemove = args.dataItem;

    this.performRemove(true);
  }

  public performRemove(isConfirmed: boolean)
  {
    if (isConfirmed && this.itemToRemove?.id)
      {
        this.service.deleteClient(this.itemToRemove.id,
          (data: any) => this.removeClientSuccessCallback(data),
          (error: any) => this.removeClientErrorCallback(error)
        )
      }
  }
  private removeClientSuccessCallback(data: any) {
    this.itemToRemove = undefined;

    this.loadGridItems();
  }
  private removeClientErrorCallback(error: any) {
    this.failureMsg = error.error.status + " - " + error.error.title;
    console.log(error, "Delete Error");
  }

  private closeEditor(): void {
    // close the editor
    this.clientsGrid?.closeRow(this.editedRowIndex);

    // revert the data item to original state
    if (this.editedClient)
      {
        let originalClient = this.gridData.find(client => client.id == this.editedClient?.id);
        if (originalClient)
          {
            Object.assign(originalClient, this.editedClient);
          }
      }

    this.editedRowIndex = undefined;
    this.editedClient = undefined;
    this.failureMsg = undefined;
  }

  public filterChangeHandler(event: any)
  {
    if (this.clientsGrid)
      this.closeEditor();
  }
  
  public sortChangeHandler(event: any)
  {
    if (this.clientsGrid)
      this.closeEditor();
  }

  title = 'ASAP_Clients_UI';

  public gridData: Client[] = [];
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;
}
