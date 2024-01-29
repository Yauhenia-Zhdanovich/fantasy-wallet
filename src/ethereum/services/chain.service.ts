import { Injectable } from '@angular/core';
import { EthereumClient } from './ethereum-client';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { chainMap } from '../constants/chains.const';

@Injectable({
  providedIn: 'root',
})
export class ChainService {
  private chainIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public chain$: Observable<string> = this.chainIdSubject.asObservable().pipe(
    map(chainId => {
      const chainName = chainMap.get(chainId);

      return chainName ?? chainId;
    })
  );

  constructor(private ethereumClient: EthereumClient) {
    this.listenToChainChanged();

    this.fetchInitialChainId().subscribe(chainId =>
      this.chainIdSubject.next(chainId)
    );

    this.listenToChainChanged().subscribe(() => window.location.reload());
  }

  private fetchInitialChainId(): Observable<string> {
    return this.ethereumClient.request({
      method: 'eth_chainId',
    });
  }

  private listenToChainChanged(): Observable<string> {
    return this.ethereumClient.listenToEvent('chainChanged');
  }
}
