import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NgRedux, select } from "@angular-redux/store";

import { WorkerItem } from './worker-item';
import { WorkerActions, SetItemDescriptionPayload } from "./worker.actions";
import { AppState } from './app-state';

@Component({
  selector: 'app-worker-item',
  template: `
    <p-dataTable [value]="_items" editable="true" [rowTrackBy]="trackByITemId">
            <p-column field="id" header="Id">
              <ng-template let-item="rowData" let-index="rowIndex" pTemplate="body">
                <label>{{item.id}}</label>
              </ng-template>
            </p-column>
            <p-column field="description" header="Desc">
            <ng-template let-item="rowData" let-index="rowIndex" pTemplate="body">
                <input [ngModel]="item.description" (ngModelChange)="onDescChange(item.id, $event)">
              </ng-template>
            </p-column>
    </p-dataTable>
  `
})

export class WorkerItemComponent implements OnInit {

  @Input() public workerId: number;

  @Input()
  public set items(_items: WorkerItem[]) {
    this._items = _.cloneDeep(_items);
  }

  public _items: WorkerItem[];

  constructor(private ngRedux: NgRedux<AppState>, private workerActions: WorkerActions) { }

  ngOnInit() { }

  public onDescChange(itemId: number, desc: string) {
    this.workerActions.setItemDescription(this.workerId, itemId, desc);
  }

  public trackByITemId(index: number, item: WorkerItem) {
    return item.id;
  }
}
