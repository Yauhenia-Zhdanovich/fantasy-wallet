import { InjectionToken, Injector } from '@angular/core';
import Web3 from 'web3';
import { ETHEREUM } from './ethereum.const';

export const WEB_3 = new InjectionToken<Web3>('WEB_3');

export function web3Factory(injector: Injector) {
  if (injector.get(ETHEREUM)) {
    return new Web3(injector.get(ETHEREUM));
  }

  return null;
}
