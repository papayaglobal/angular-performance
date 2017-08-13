import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice.component';
import { WorkerComponent } from './worker.component';
import { DataTableModule } from 'primeng/primeng';
import { WorkerItemComponent } from './worker-item.component';
import { AppState } from './app-state';
import { rootReducer, INITIAL_STATE } from './store';
import { WorkerActions } from './worker.actions';

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
    DataTableModule,
    NgReduxModule
  ],
  providers: [WorkerActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, devTools: DevToolsExtension) {
    const enhancers = [devTools.enhancer()];
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      enhancers);
  }
}
