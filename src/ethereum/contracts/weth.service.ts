import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3, { Contract } from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { WETH_CONTRACT } from './constants/weth-contract.const';
import { SmartContractInfo } from './interfaces';
import { AddressService } from '../address.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class WethService extends SmartContractService {
  public contract: Contract<any>;

  constructor(
    @Inject(WEB_3) private web3: Web3,
    @Inject(WETH_CONTRACT) private wethContract: SmartContractInfo,
    private readonly accountService: AddressService
  ) {
    super(web3);
    this.contract = new web3.eth.Contract(
      wethContract.abi,
      wethContract.address
    );
  }

  public async transfer(toAddress: string, amount: number) {
    try {
      console.log(this.web3.utils.toWei(amount.toString(), 'ether'));
      const gas = await this.contract.methods['transfer'](
        toAddress,
        this.web3.utils.toWei(amount.toString(), 'ether')
      ).estimateGas({
        from: this.accountService.currentAddress,
      });

      await this.contract.methods['transfer'](
        toAddress,
        this.web3.utils.toWei(amount.toString(), 'ether')
      ).send({
        from: this.accountService.currentAddress,
        gas: gas.toString(),
      });

      console.log('Token transfer successful!');
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  }

  public getBalanceOf(address: string): Observable<string> {
    return from(
      this.contract.methods['balanceOf'](address).call() as Promise<string>
    );
  }
}
