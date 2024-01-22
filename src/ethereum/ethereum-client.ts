import { Inject, Injectable, Optional } from '@angular/core';
import { ETHEREUM } from './ethereum.const';
import { Observable, from } from 'rxjs';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { RequestArguments } from '@metamask/providers/dist/BaseProvider';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EthereumClient {
  constructor(
    @Optional() @Inject(ETHEREUM) private ethereum: MetaMaskInpageProvider
  ) {}

  public request(params: RequestArguments): Observable<any> {
    return from(this.ethereum.request(params));
  }

  public listenToEvent(eventName: string): Observable<any> {
    return fromEvent(this.ethereum, eventName);
  }
}
