import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3, { Contract } from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { WETH_CONTRACT } from './constants/weth-contract.const';
import { SmartContractInfo } from './interfaces';

@Injectable()
export class WethService extends SmartContractService {
  public contract: Contract<any>;

  constructor(
    @Inject(WEB_3) private web3: Web3,
    @Inject(WETH_CONTRACT) private wethContract: SmartContractInfo
  ) {
    super(web3);
    this.contract = new web3.eth.Contract(
      wethContract.abi,
      wethContract.address
    );
  }

  public getBalanceOf(address: string): any {
    this.contract.methods['balanceOf'](address)
      .call()
      .then(result => {
        console.log(result);
      });
  }
}
