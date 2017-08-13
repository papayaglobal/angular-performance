# TestPerformance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

The project is an attempt to test the performance of a angular when using a large nested structure.
The structure in this case is:

- invoice
  - worker
    - worker item

## Performance test phases

### Plain vanilla
 The first "plain-vanilla" implementation uses `ngFor` to iterate over workers and passes the worker data to the `workerComponent` which in turn passes the items to `workerItemComponent` which uses [`PrimeNG DataTable`](https://www.primefaces.org/primeng/#/datatable) to display the items. this implementation has performance problems when used with 100(workers)x10(items per worker)

this implementation is in `performance-problem` branch.

### Using TrackBy
The first enhancment was to use `trackBy` in `ngFor` and `PrimeNG` this is the 20-80 rule that can be used to enhance small amounts of data, it worked well for 100x10 but was slow for 100x40 or more. 

this enahncment can be found in `with-trackBy` branch

### Enter Redux
The second enhancment was to use redux and observables for the workers list and the worker data this change by itself has minor impact on performance.

it can be found at `redux-and-observables` branch

### Item level observables
The next step was to use observables also at the worker item level this step made it possible to use 100x100 (and even larger) sets. The reason for it being more efficient is that when a single item is changing the change is limited only to the scope of this item and doesn't affect any of the other elements on the page.

A side affect of this change was to replace PrimeNG data tables with ngFor since primeNG data tables don't support observables as row data.

this enhancment is in `observable-per-item` branch

### OnPush change detection strategy
The last step was to use `ChangeDetectionStrategy.OnPush` in all components. since this change causes Angular to minimize it's change detection activity it made the app more performant even with a data set of 200x200.

The code for this step is in `master` branch

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
