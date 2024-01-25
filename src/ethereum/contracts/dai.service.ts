import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3, { Contract } from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { SmartContractInfo } from './interfaces';
import { DAI_CONTRACT } from './constants/dai-contract.const';

@Injectable()
export class DaiService extends SmartContractService {
  public contract: Contract<any>;

  constructor(
    @Inject(WEB_3) private web3: Web3,
    @Inject(DAI_CONTRACT) private daiContract: SmartContractInfo
  ) {
    super(web3);
    this.contract = new web3.eth.Contract(daiContract.abi, daiContract.address);
  }

  public getBalanceOf(address: string): any {
    this.contract.methods['balanceOf'](address)
      .call()
      .then(result => {
        console.log(result);
      });
  }
}
