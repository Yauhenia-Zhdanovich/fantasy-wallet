import { InjectionToken } from '@angular/core';
import { SmartContractService } from './abstract-contract.service';

export const CONTRACTS = new InjectionToken<SmartContractService>('CONTRACTS');
