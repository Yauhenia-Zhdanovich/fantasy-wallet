import { Inject, Injectable } from '@angular/core';
import { Observable, map, from, catchError, of } from 'rxjs';
import { EthereumClient } from './ethereum-client';
import {
  ETHEREUM_COIN_NAME,
  ETHEREUM_COIN_SYMBOL,
} from '../constants/ethereum-balance.const';
import { BalanceInfo } from '../contracts/interfaces';
import { WEB_3 } from '../constants/web3.const';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class EthereumBalanceService {
  constructor(
    private ethereumClient: EthereumClient,
    @Inject(WEB_3) private web3: Web3
  ) {}

  public fetchBalance(address: string): Observable<BalanceInfo> {
    return this.ethereumClient
      .request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })
      .pipe(
        map(value => ({
          balance: value,
          tokenName: ETHEREUM_COIN_NAME,
          symbol: ETHEREUM_COIN_SYMBOL,
        }))
      );
  }

  public sendEther(
    fromAddress: string,
    to: string,
    value: string
  ): Observable<any> {
    return from(
      this.web3.eth.sendTransaction({
        from: fromAddress,
        to,
        value,
      })
    ).pipe(
      catchError(err => {
        console.log(err);
        return of(err);
      })
    );
  }
}
