import { InjectionToken } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';

export const ETHEREUM = new InjectionToken<string>('ETHEREUM');

export function ethereumFactory(): MetaMaskInpageProvider {
  const ethereum = window.ethereum;

  if (!ethereum) {
    throw new Error('No Ethereum provider found');
  }
  return ethereum;
}
