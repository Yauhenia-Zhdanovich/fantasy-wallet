import { Injectable, NgZone } from '@angular/core';
import { EthereumClient } from '../../ethereum/ethereum-client';
import {
  BehaviorSubject,
  Observable,
  filter,
  forkJoin,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
import Web3 from 'web3';

import {
  WETH_CONTRACT_ABI,
  WETH_CONTRACT_ADDRESS,
} from '../../ethereum/constants/wethContract.const';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private addressSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public address$: Observable<string> = this.addressSubject.asObservable();

  private ethBalanceSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private wethBalanceSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public ethBalance$: Observable<string> =
    this.ethBalanceSubject.asObservable();
  public wethBalance$: Observable<string> =
    this.wethBalanceSubject.asObservable();

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
    this.address$
      .pipe(
        filter(address => !!address),
        switchMap(address => {
          return forkJoin([
            this.fetchEthAccountBalance(address),
            this.fetchWethBalance(address),
          ]);
        })
      )
      .subscribe(([ethBalance, wethBalance]) => {
        this.ethBalanceSubject.next(ethBalance);
        this.wethBalanceSubject.next(wethBalance);
      });
  }

  public fetchInitialConnectedAddress(): Observable<string> {
    return this.ethereumClient
      .request({ method: 'eth_requestAccounts' })
      .pipe(map(value => value[0]));
  }

  public fetchWethBalance(address: string): Observable<string> {
    // temporary!!!!!!!!!!!!! TODO: move as a standalone functionality
    const web3 = new Web3(window.ethereum);
    const wethContract = new web3.eth.Contract(
      WETH_CONTRACT_ABI,
      WETH_CONTRACT_ADDRESS
    );
    // temporary!!!!!!!!!!!!!

    return from(
      wethContract.methods['balanceOf'](address).call() as Promise<string>
    );
  }

  public fetchEthAccountBalance(address: string): Observable<string> {
    return this.ethereumClient.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
  }

  public listenToSelectedAccount(): Observable<string> {
    return this.ethereumClient
      .listenToEvent('accountsChanged')
      .pipe(map(value => value[0]));
  }
}
