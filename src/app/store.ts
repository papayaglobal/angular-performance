import * as _ from 'lodash';

import { AppState } from './app-state';
import { Action, WorkerActions, SetNamePayload, SetItemDescriptionPayload, AddWorkerPayload } from './worker.actions';
import { Worker } from './worker';
import { WorkerItem } from './worker-item';

export const INITIAL_STATE: AppState = {
  workers: [],
};

export function rootReducer(
  lastState: AppState,
  action: Action<AddWorkerPayload | SetNamePayload | SetItemDescriptionPayload>
): AppState {
  switch (action.type) {

    case WorkerActions.ADD_WORKER: {
      let workers = lastState.workers.slice();
      const newWorker = (<Action<AddWorkerPayload>>action).payload.worker;
      workers.push(Object.assign({}, newWorker));

      return { workers };
    }

    case WorkerActions.SET_NAME: {
      const setAction = (<Action<SetNamePayload>>action).payload;
      const workers = _.map(lastState.workers, (worker: Worker) => {
        if (worker.id !== setAction.workerId) {
          return worker;
        }

        return {
          ...worker,
          ...{ name: setAction.name }
        };
      });
      return { workers };
    }

    case WorkerActions.SET_ITEM_DESCRIPTION: {
      const setItemAction = (<Action<SetItemDescriptionPayload>>action).payload;
      const workers = _.map(lastState.workers, (worker: Worker) => {
        if (worker.id !== setItemAction.workerId) {
          return worker;
        }

        const items = _.map(worker.items, (item: WorkerItem) => {
          if (item.id !== setItemAction.itemId) {
            return item;
          }

          return {
            ...item,
            ...{ description: setItemAction.desc }
          };
        });

        return {
          ...worker,
          ...{ items }
        };
      });

      return { workers };
    }

    default: return lastState;
  }
}
