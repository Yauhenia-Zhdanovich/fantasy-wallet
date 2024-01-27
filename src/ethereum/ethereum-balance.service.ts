import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EthereumClient } from './ethereum-client';

@Injectable({
  providedIn: 'root',
})
export class EthereumBalanceService {
  constructor(private ethereumClient: EthereumClient) {}

  public fetchBalance(address: string): Observable<string> {
    return this.ethereumClient.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
  }
}
