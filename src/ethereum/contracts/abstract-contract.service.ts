import {
  BehaviorSubject,
  Observable,
  combineLatest,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
import Web3, { Contract } from 'web3';
import { BalanceInfo, SmartContractInfo } from './interfaces';
import { WEB_3 } from '../constants/web3.const';
import { Inject } from '@angular/core';
import { DAI_CONTRACT } from './constants/dai-contract.const';
import { AddressService } from '../services/address.service';

export abstract class SmartContractService {
  public contract: Contract<any>;
  public symbol: string;
  protected isContractAvailableSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  protected balanceSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public balance$: Observable<BalanceInfo> = this.balanceSubject
    .asObservable()
    .pipe(
      map(value =>
        value !== null
          ? {
              balance: value,
              tokenName: this.contractInfo.tokenName,
              symbol: this.contractInfo.symbol,
            }
          : value
      )
    );

  constructor(
    @Inject(WEB_3) protected web3: Web3,
    @Inject(DAI_CONTRACT) protected contractInfo: SmartContractInfo,
    protected addressService: AddressService
  ) {
    this.contract = new web3.eth.Contract(
      contractInfo.abi,
      contractInfo.address
    );
    this.symbol = contractInfo.symbol;

    combineLatest([
      this.checkContractAvailability(),
      this.addressService.address$,
    ])
      .pipe(
        switchMap(([isAvailable, address]) =>
          isAvailable && address ? this.getBalanceOf(address) : of(null)
        )
      )
      .subscribe(this.balanceSubject);
  }

  public checkContractAvailability(): Observable<boolean> {
    return from(this.web3.eth.getCode(this.contractInfo.address)).pipe(
      map(bytecode => bytecode !== '0x')
    );
  }

  public getBalanceOf(address: string): Observable<any> {
    return from(this.contract.methods['balanceOf'](address).call());
  }

  public abstract transfer(toAddress: string, amount: number): any;
}
