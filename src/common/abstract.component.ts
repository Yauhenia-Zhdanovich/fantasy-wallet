import { Component, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  template: '',
})
export abstract class AbstractComponent implements OnDestroy {
  private readonly onDestroySubscription$ = new ReplaySubject<boolean>();

  public ngOnDestroy(): void {
    this.onDestroySubscription$.next(true);
    this.onDestroySubscription$.complete();
  }

  protected untilComponentDestroyed<T>(): (
    source$: Observable<T>
  ) => Observable<T> {
    return (source$: Observable<T>) =>
      source$.pipe(takeUntil(this.onDestroySubscription$));
  }
}
