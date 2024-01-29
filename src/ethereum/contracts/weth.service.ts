import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3 from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { WETH_CONTRACT } from './constants/weth-contract.const';
import { SmartContractInfo } from './interfaces';

@Injectable()
export class WethService extends SmartContractService {
  constructor(
    @Inject(WEB_3) web3: Web3,
    @Inject(WETH_CONTRACT) contractInfo: SmartContractInfo
  ) {
    super(web3, contractInfo);
  }

  public async transfer(toAddress: string, amount: number) {
    // try {
    //   console.log(this.web3.utils.toWei(amount.toString(), 'ether'));
    //   const gas = await this.contract.methods['transfer'](
    //     toAddress,
    //     this.web3.utils.toWei(amount.toString(), 'ether')
    //   ).estimateGas({
    //     from: this.accountService.currentAddress,
    //   });
    //   await this.contract.methods['transfer'](
    //     toAddress,
    //     this.web3.utils.toWei(amount.toString(), 'ether')
    //   ).send({
    //     from: this.accountService.currentAddress,
    //     gas: gas.toString(),
    //   });
    //   console.log('Token transfer successful!');
    // } catch (error) {
    //   console.error('Error transferring tokens:', error);
    //   throw error;
    // }
  }
}
