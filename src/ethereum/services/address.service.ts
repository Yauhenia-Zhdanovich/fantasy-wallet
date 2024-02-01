import { Injectable, NgZone } from '@angular/core';
import { EthereumClient } from './ethereum-client';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public address$: Observable<string> = this.addressSubject.asObservable();

  get currentAddress(): string {
    return this.addressSubject.getValue();
  }

  constructor(
    private ethereumClient: EthereumClient,
    private _ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {
    this.fetchInitialConnectedAddress().subscribe(address =>
      this.addressSubject.next(address)
    );

    this.listenToSelectedAccount().subscribe(address => {
      this._ngZone.run(() => {
        this.addressSubject.next(address);
      });
    });
  }

  private fetchInitialConnectedAddress(): Observable<string> {
    return this.ethereumClient.request({ method: 'eth_requestAccounts' }).pipe(
      map(value => value[0]),
      catchError(err => {
        this._snackBar.open(err.message, 'Dismiss');
        throw err;
      })
    );
  }

  private listenToSelectedAccount(): Observable<string> {
    return this.ethereumClient.listenToEvent('accountsChanged').pipe(
      map(value => value[0]),
      catchError(err => {
        this._snackBar.open(err.message, 'Dismiss');
        throw err;
      })
    );
  }
}
