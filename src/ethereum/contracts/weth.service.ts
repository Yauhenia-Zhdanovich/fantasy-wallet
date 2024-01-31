import { Inject, Injectable } from '@angular/core';
import { WEB_3 } from '../constants/web3.const';
import Web3 from 'web3';
import { SmartContractService } from './abstract-contract.service';
import { WETH_CONTRACT } from './constants/weth-contract.const';
import { SmartContractInfo } from './interfaces';
import { AddressService } from '../services/address.service';
import { catchError, from, of, switchMap } from 'rxjs';

@Injectable()
export class WethService extends SmartContractService {
  constructor(
    @Inject(WEB_3) web3: Web3,
    @Inject(WETH_CONTRACT) contractInfo: SmartContractInfo,
    addressService: AddressService
  ) {
    super(web3, contractInfo, addressService);
  }

  public transfer(toAddress: string, amount: number) {
    from(
      this.contract.methods['transfer'](
        toAddress,
        this.web3.utils.toWei(amount.toString(), 'ether')
      ).estimateGas({
        from: this.addressService.currentAddress,
      })
    ).pipe(
      switchMap(gas =>
        from(
          this.contract.methods['transfer'](
            toAddress,
            this.web3.utils.toWei(amount.toString(), 'ether')
          ).send({
            from: this.addressService.currentAddress,
            gas: gas.toString(),
          })
        )
      ),
      catchError(err => {
        console.log(err);
        return of(err);
      })
    );
  }
}
