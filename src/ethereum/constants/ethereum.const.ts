import { InjectionToken } from '@angular/core';

export const ETHEREUM = new InjectionToken<string>('ETHEREUM');

export function ethereumFactory() {
  const ethereum = window.ethereum;

  if (!ethereum) {
    throw new Error('No Ethereum provider found');
  }
  return ethereum;
}
