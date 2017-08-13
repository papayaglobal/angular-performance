import { Observable } from 'rxjs/Observable';
import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { NgRedux, select } from '@angular-redux/store';

import { WorkerItem } from './worker-item';
import { WorkerActions, SetItemDescriptionPayload } from './worker.actions';
import { AppState } from './app-state';
import { Worker } from './worker';


@Component({
  selector: 'app-worker-item',
  template: `
    <div>
      <label>{{item?.id}}</label>
      <input [ngModel]="item?.description" (ngModelChange)="onDescChange($event)">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkerItemComponent implements OnInit {

  @Input()
  public set workerId(_workerId: number) {
    this._workerId = _workerId;
    this.selectItem();
  }

  @Input()
  public set itemId(_itemId: number) {
    this._itemId = _itemId;
    this.selectItem();
  }

  public item: WorkerItem;

  private _workerId: number;
  private _itemId: number;
  private item$: Observable<WorkerItem>;


  constructor(private ngRedux: NgRedux<AppState>, private workerActions: WorkerActions) { }

  ngOnInit() { }

  public onDescChange(desc: string) {
    this.workerActions.setItemDescription(this._workerId, this._itemId, desc);
  }

  private selectItem() {
    if (_.isNil(this._workerId) || _.isNil(this._itemId)) {
      return;
    }

    this.item$ = this.ngRedux.select('workers')
    .map(workers => _.find(workers, (worker: Worker) => {
      return worker.id === this._workerId;
    }))
      .map((worker: Worker) => _.find(worker.items, (item: WorkerItem) => item.id === this._itemId))
      .distinctUntilChanged();

    this.item$.subscribe(item => {
      console.log('item change', this._workerId, this._itemId);
      this.item = item;
    });
  }
}
