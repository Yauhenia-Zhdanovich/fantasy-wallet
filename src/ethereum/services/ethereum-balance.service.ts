import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EthereumClient } from './ethereum-client';
import {
  ETHEREUM_COIN_NAME,
  ETHEREUM_COIN_SYMBOL,
} from '../constants/ethereum-balance.const';
import { BalanceInfo } from '../contracts/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EthereumBalanceService {
  constructor(private ethereumClient: EthereumClient) {}

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
}
