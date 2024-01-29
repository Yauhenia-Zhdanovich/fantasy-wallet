import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3 from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { SmartContractInfo } from './interfaces';
import { DAI_CONTRACT } from './constants/dai-contract.const';

@Injectable()
export class DaiService extends SmartContractService {
  constructor(
    @Inject(WEB_3) web3: Web3,
    @Inject(DAI_CONTRACT) contractInfo: SmartContractInfo
  ) {
    super(web3, contractInfo);
  }

  public transfer(toAddress: string, amount: number) {}
}
