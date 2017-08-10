import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice.component';
import { WorkerComponent } from './worker.component';
import { DataTableModule } from 'primeng/primeng';
import { WorkerItemComponent } from './worker-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    WorkerComponent,
    WorkerItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
