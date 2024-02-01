import { InjectionToken } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';

export const ETHEREUM = new InjectionToken<string>('ETHEREUM');

export function ethereumFactory(): MetaMaskInpageProvider {
  const ethereum = window.ethereum;

  if (!ethereum) {
    alert(
      'Please install MetaMask! To work with the dApp you need to install MetaMask extension.'
    );
    throw new Error('No Ethereum provider found');
  }
  return ethereum;
}
