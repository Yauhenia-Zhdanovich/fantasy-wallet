import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3 from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { SmartContractInfo } from './interfaces';
import { DAI_CONTRACT } from './constants/dai-contract.const';
import { AddressService } from '../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DaiService extends SmartContractService {
  constructor(
    @Inject(WEB_3) web3: Web3,
    @Inject(DAI_CONTRACT) contractInfo: SmartContractInfo,
    addressService: AddressService,
    matSnackBar: MatSnackBar
  ) {
    super(web3, contractInfo, addressService, matSnackBar);
  }
}
