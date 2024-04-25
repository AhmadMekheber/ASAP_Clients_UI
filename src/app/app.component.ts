import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientService } from "./client.service";
import { GridModule, GridComponent, GridDataResult, PageChangeEvent, AddEvent, EditEvent, CancelEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NgForm, FormsModule } from '@angular/forms';
import { SortDescriptor } from '@progress/kendo-data-query';
import { CommonModule } from '@angular/common';
// import { GridDataResult } from './grid-data-result';
// import { kendoLicense } from '@progress/kendo-licensing';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Client } from './data.clients';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridModule, InputsModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ClientService]
})

export class AppComponent {
  // constructor() {
  //   kendoLicense('./kendo-ui-license.txt'); // Replace with actual path
  // }
  //private editService: EditService;
  private editedRowIndex?: number = undefined;
  private editedClient?: Client;

  constructor(private service: ClientService) {
    this.loadGridItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.gridItems = this.service.getClients(
      this.skip,
      this.pageSize,
      this.sortDescriptor,
      this.filterTerm
    );

    // this.service.getClients(
    //   this.skip,
    //   this.pageSize,
    //   this.sortDescriptor,
    //   this.filterTerm
    // ).subscribe((data) => {
    //   // Access the data here (data is an array of Client objects)
    //   console.log(data); // Example: log the received data

    //   // You can use the data for further processing or display it in your UI
    // },
    // (error) => console.error(`Error fetching clients: ${error}`), // Handle errors
    // () => console.log('Clients data received successfully')); // Handle completion (optional));
  }

  public addClient(clientData: any): void {
    this.service.addClient(clientData).subscribe(() => {
      this.loadGridItems();
    });
  }

  public addHandler(args: AddEvent, formInstance: NgForm): void {
    console.log(args, "Add Event Args");

    formInstance.reset();
    // close the previously edited item
    this.closeEditor(args.sender);
    // open a new item editor
    args.sender.addRow(new Client());
  }

  public editHandler(args: EditEvent): void {
    console.log(args, "Edit Event Args");

    // close the previously edited item
    this.closeEditor(args.sender);
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
    console.log(args, "Cancel Event Args");

    // call the helper method
    this.closeEditor(args.sender, args.rowIndex);
  }

  public saveHandler(args: SaveEvent): void {
    console.log(args, "Save Event Args");
    // update the data source
    //this.editService.save(args.dataItem, args.isNew);
    
    if (this.editedClient?.id == null)
      {

      }
      else 
      {
        this.updateClient(this.editedClient.id, args.dataItem);
      }
    
    // close the editor, that is, revert the row back into view mode
    //args.sender.closeRow(args.rowIndex);

    this.editedRowIndex = undefined;
    this.editedClient = undefined;
  }

  public updateClient(clientID: number, clientData: any): void {
    this.service.updateClient(clientID, clientData).subscribe(
      (data) => {
        console.log(data, "Save");
      this.loadGridItems();
    },
     (data) => {
        console.log(data, "Save Error");
    }, 
    () => {
      console.log("Save Complete")
    });
  }

  public deleteClient(clientID: number): void {
    this.service.deleteClient(clientID).subscribe(() => {
      this.loadGridItems();
    });
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    // close the editor
    grid.closeRow(rowIndex);
    // revert the data item to original state
    //
    //
    //
    //this.editService.resetItem(this.editedProduct);
    //
    //
    //
    // reset the helpers
    this.editedRowIndex = undefined;
    this.editedClient = undefined;
  }

  title = 'ASAP_Clients_UI';

  public gridItems: Observable<any> | undefined;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;
}
