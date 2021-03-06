import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';


import { Worker } from './worker';
import { WorkerItem } from './worker-item';
import { AppState } from './app-state';
import { WorkerActions } from './worker.actions';

@Component({
  selector: 'app-worker',
  template: `
  <div *ngIf="worker$ | async">
      <label>Id: {{worker.id}}</label>
      <label>Name</label>
      <input type="" [ngModel]="worker.name" (ngModelChange)="onNameChange($event)">
      <div *ngFor="let item of worker.items; trackBy: trackByITemId">
      <app-worker-item [workerId]="worker.id" [itemId]="item.id"></app-worker-item>
      </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkerComponent implements OnInit {

  @Input()
  public set workerId(_workerId: number) {
    if (!this.worker || _workerId !== this.worker.id) {
      this.worker$ = <Observable<Worker>>this.ngRedux.select('workers')
        .map((workers: Worker[]) => {
          return _.find(workers, worker => worker.id === _workerId);
        })
        .distinctUntilChanged((workerA: Worker, workerB: Worker) => {
          return !!workerA
            && !!workerB
            && workerA.name === workerB.name;
        })
        .do((worker: Worker) => {
          console.log('worker change', _workerId);
          this.worker = worker;
        });
    }
  }

  @Output() public workerChanged = new EventEmitter<Worker>();
  @Output() public itemChanged = new EventEmitter<{ workerId: number, item: WorkerItem }>();

  public worker$: Observable<Worker>;
  public worker: Worker;

  constructor(private ngRedux: NgRedux<AppState>, private workerActions: WorkerActions) { }

  ngOnInit() { }

  public onNameChange(newName: string) {
    this.workerActions.setName(this.worker.id, newName);
  }

  public trackByITemId(index: number, item: WorkerItem) {
    return item.id;
  }
}
