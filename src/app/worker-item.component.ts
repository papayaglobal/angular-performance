import { Component, Input, Output, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { WorkerItem } from './worker-item';

@Component({
  selector: 'app-worker-item',
  template: `
    <p-dataTable [value]="_items" editable="true">
            <p-column field="id" header="Id">
              <ng-template let-item="rowData" let-index="rowIndex" pTemplate="body">
                <label>{{item.id}}</label>
              </ng-template>
            </p-column>
            <p-column field="description" header="Desc">
            <ng-template let-item="rowData" let-index="rowIndex" pTemplate="body">
                <input [ngModel]="item.description" (ngModelChange)="onDescChange($event)">
              </ng-template>
            </p-column>
    </p-dataTable>
  `
})

export class WorkerItemComponent implements OnInit {

  @Input()
  public set items(_items: WorkerItem[]) {
    this._items = _.cloneDeep(_items);
  }

  public _items: WorkerItem[];

  constructor() { }

  ngOnInit() { }

  public onDescChange(desc: string) {

  }
}
