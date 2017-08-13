import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { Worker } from './worker';
import { WorkerItem } from './worker-item';
import { WorkerActions } from './worker.actions';
import { AppState } from './app-state';

@Component({
  selector: 'app-invoice',
  template: `
  <div *ngFor="let workerId of workers$ | async; trackBy: trackByWorkerId;">
    <app-worker [workerId]="workerId"></app-worker>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InvoiceComponent implements OnInit {

  public workers$: Observable<number[]>;

  constructor(private ngRedux: NgRedux<AppState>, workerActions: WorkerActions) {
    for (let i = 0; i < 200; i++) {
      const worker = new Worker;
      worker.id = i;
      worker.name = `my name is ${i}`;
      worker.items = [];
      for (let j = 0; j < 200; j++) {
        const item = new WorkerItem();
        item.description = `item ${i}-${j}`;
        item.id = (i * 200) + j;
        item.value = _.random(1, 1000);
        worker.items.push(item);
      }

      workerActions.addWorker(worker);
    }
  }

  public ngOnInit() {
    this.workers$ = this.ngRedux.select('workers')
      .map((workers: Worker[]) => _.map(workers, worker => worker.id))
      .distinctUntilChanged();
  }

  public trackByWorkerId(index: number, worker: Worker) {
    return worker.id;
  }
}
