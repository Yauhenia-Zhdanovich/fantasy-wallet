import { Injectable, NgZone } from '@angular/core';
import { EthereumClient } from './ethereum-client';
import { BehaviorSubject, Observable, map } from 'rxjs';

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
    private _ngZone: NgZone
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

  public fetchInitialConnectedAddress(): Observable<string> {
    return this.ethereumClient
      .request({ method: 'eth_requestAccounts' })
      .pipe(map(value => value[0]));
  }

  public listenToSelectedAccount(): Observable<string> {
    return this.ethereumClient
      .listenToEvent('accountsChanged')
      .pipe(map(value => value[0]));
  }
}
