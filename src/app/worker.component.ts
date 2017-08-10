import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Worker } from './worker';
import { WorkerItem } from './worker-item';

@Component({
  selector: 'app-worker',
  template: `
  <div *ngIf="_worker">
      <label>Id: {{_worker.id}}</label>
      <label>Name</label>
      <input type="" [ngModel]="_worker.name" (ngModelChange)="onNameChange($event)">
      <app-worker-item [items]="_worker.itemsA" (itemChanged)="itemChanged.emit({workerId: _worker.id, item: $event})"></app-worker-item>
  </div>
  `
})

export class WorkerComponent implements OnInit {

  @Input()
  public set worker(_worker: Worker) {
    this._worker = _.cloneDeep(_worker);
  }

  @Output() public workerChanged = new EventEmitter<Worker>();
  @Output() public itemChanged = new EventEmitter<{workerId: number, item: WorkerItem}>();

  public _worker: Worker;

  constructor() { }

  ngOnInit() { }

  public onNameChange(name: string) {
    this.workerChanged.emit(Object.assign({}, _.cloneDeep(this._worker), { name }));
  }
}
