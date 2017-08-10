import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Worker } from './worker';
import { WorkerItem } from './worker-item';

@Component({
  selector: 'app-invoice',
  template: `
  <div *ngFor="let worker of workers; trackBy: trackByWorkerId;">
    <app-worker [worker]="worker" (workerChanged)="onWorkerChanged($event)" (itemChanged)="onItemChanged($event)"></app-worker>
  </div>
  `
})

export class InvoiceComponent implements OnInit {
  public workers: Worker[] = [];

  constructor() { }

  public ngOnInit() {
    for (let i = 0; i < 100; i++) {
      const worker = new Worker;
      worker.id = i;
      worker.name = `my name is ${i}`;
      worker.itemsA = [];
      for (let j = 0; j < 10; j++) {
        const item = new WorkerItem();
        item.description = `item ${i}-${j}`;
        item.id = (i * 100) + j;
        item.value = _.random(1, 1000);
        worker.itemsA.push(item);
      }

      this.workers.push(worker);
    }
  }

  public onWorkerChanged(worker: Worker) {
    const workerIndex = this.workers.findIndex(_worker => _worker.id === worker.id);
    let workers = _.cloneDeep(this.workers);
    workers.splice(workerIndex, 1, worker);
    this.workers = [...workers];
  }

  public trackByWorkerId(index: number, worker: Worker) {
    return worker.id;
  }

  public onItemChanged(event: {workerId: number, item: WorkerItem}) {
    const worker = this.workers.find(_worker => _worker.id === event.workerId);
    let items = _.cloneDeep(worker.itemsA);
    const itemIndex = items.findIndex(item => item.id === event.item.id);
    items.splice(itemIndex, 1, event.item);
    worker.itemsA = items;
  }
}
