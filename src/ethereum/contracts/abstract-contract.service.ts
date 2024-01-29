import { BehaviorSubject, Observable, from, map, of, switchMap } from 'rxjs';
import Web3, { Contract } from 'web3';
import { SmartContractInfo } from './interfaces';
import { WEB_3 } from '../constants/web3.const';
import { Inject } from '@angular/core';
import { DAI_CONTRACT } from './constants/dai-contract.const';

export abstract class SmartContractService {
  public contract: Contract<any>;
  protected isContractAvailableSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(WEB_3) protected web3: Web3,
    @Inject(DAI_CONTRACT) protected contractInfo: SmartContractInfo
  ) {
    this.contract = new web3.eth.Contract(
      contractInfo.abi,
      contractInfo.address
    );

    this.checkContractAvailability().subscribe(isAvailable => {
      this.isContractAvailableSubject.next(isAvailable);
    });
  }

  public checkContractAvailability(): Observable<boolean> {
    return from(this.web3.eth.getCode(this.contractInfo.address)).pipe(
      map(bytecode => bytecode !== '0x')
    );
  }

  public getBalanceOf(address: string): Observable<any> {
    return this.isContractAvailableSubject.pipe(
      switchMap(isAvailable =>
        isAvailable
          ? from(this.contract.methods['balanceOf'](address).call())
          : of('')
      )
    );
  }

  public abstract transfer(toAddress: string, amount: number): any;
}
