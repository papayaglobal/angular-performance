import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { AppState } from './app-state';
import { Worker } from './worker';

export interface Action<T> {
  type: string;
  payload: T;
}

export interface SetNamePayload {
  workerId: number;
  name: string;
}
export interface SetItemDescriptionPayload {
  workerId: number;
  itemId: number;
  desc: string;
}

export interface AddWorkerPayload {
  worker: Worker;
}

@Injectable()
export class WorkerActions {
  static ADD_WORKER = 'ADD_WORKER';
  static SET_NAME = 'SET_NAME';
  static SET_ITEM_DESCRIPTION = 'SET_ITEM_DESCRIPTION';

  constructor(
    private ngRedux: NgRedux<AppState>) {
  }

  public addWorker(worker: Worker): Action<AddWorkerPayload> {
    return this.ngRedux.dispatch({
      type: WorkerActions.ADD_WORKER,
      payload: {
        worker
      }
    });
  }

  public setName(workerId: number, name: string): Action<SetNamePayload> {
    return this.ngRedux.dispatch({
      type: WorkerActions.SET_NAME,
      payload: {
        workerId,
        name
      }
    });
  }

  public setItemDescription(workerId: number, itemId: number, desc: string): Action<SetItemDescriptionPayload> {
    return this.ngRedux.dispatch({
      type: WorkerActions.SET_ITEM_DESCRIPTION,
      payload: {
        workerId,
        itemId,
        desc
      }
    });
  }
}
