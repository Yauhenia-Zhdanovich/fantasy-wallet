import { ApplicationConfig, Injector } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  ETHEREUM,
  ethereumFactory,
} from '../ethereum/constants/ethereum.const';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WEB_3, web3Factory } from '../ethereum/constants/web3.const';
import { WethService } from '../ethereum/contracts/weth.service';
import Web3 from 'web3';
import {
  WETH_CONTRACT,
  WETH_CONTRACT_INFO,
} from '../ethereum/contracts/constants/weth-contract.const';
import {
  DAI_CONTRACT,
  DAI_CONTRACT_INFO,
} from '../ethereum/contracts/constants/dai-contract.const';
import { SmartContractInfo } from '../ethereum/contracts/interfaces';
import { DaiService } from '../ethereum/contracts/dai.service';
import { CONTRACTS } from '../ethereum/contracts/contract.token';
import { AddressService } from '../ethereum/services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ETHEREUM, useFactory: ethereumFactory },
    { provide: WEB_3, useFactory: web3Factory, deps: [Injector] },
    { provide: WETH_CONTRACT, useValue: WETH_CONTRACT_INFO },
    { provide: DAI_CONTRACT, useValue: DAI_CONTRACT_INFO },
    {
      provide: CONTRACTS,
      useFactory: (
        web3: Web3,
        wethContract: SmartContractInfo,
        addressService: AddressService,
        matSnackBar: MatSnackBar
      ) => new WethService(web3, wethContract, addressService, matSnackBar),
      deps: [WEB_3, WETH_CONTRACT, AddressService, MatSnackBar],
      multi: true,
    },
    {
      provide: CONTRACTS,
      useFactory: (
        web3: Web3,
        daiContract: SmartContractInfo,
        addressService: AddressService,
        matSnackBar: MatSnackBar
      ) => new DaiService(web3, daiContract, addressService, matSnackBar),
      deps: [WEB_3, DAI_CONTRACT, AddressService, MatSnackBar],
      multi: true,
    },

    provideAnimations(),
  ],
};
