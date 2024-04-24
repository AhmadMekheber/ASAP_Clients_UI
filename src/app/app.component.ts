import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientService } from "./client.service";
import { GridModule, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { CommonModule } from '@angular/common';
// import { GridDataResult } from './grid-data-result';
// import { kendoLicense } from '@progress/kendo-licensing';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ClientService]
})
export class AppComponent {
  // constructor() {
  //   kendoLicense('./kendo-ui-license.txt'); // Replace with actual path
  // }
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
}
  title = 'ASAP_Clients_UI';

  public gridItems: Observable<GridDataResult> | undefined;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;
}
