import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { WorkerItem } from './worker-item';

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

  @Input()
  public set items(_items: WorkerItem[]) {
    this._items = _.cloneDeep(_items);
  }

  @Output() public itemChanged = new EventEmitter<WorkerItem>();

  public _items: WorkerItem[];

  constructor() { }

  ngOnInit() { }

  public onDescChange(itemId: number, desc: string) {
    const item = _.find(this._items, item => item.id === itemId);
    this.itemChanged.emit(Object.assign({}, item, { description: desc }));
  }

  public trackByITemId(index: number, item: WorkerItem) {
    return item.id;
  }
}
