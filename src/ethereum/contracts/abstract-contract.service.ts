import {
  BehaviorSubject,
  Observable,
  catchError,
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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    protected addressService: AddressService,
    private _snackBar: MatSnackBar
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
        ),
        catchError(err => {
          this._snackBar.open(err.message, 'Dismiss');
          throw err;
        })
      )
      .subscribe(this.balanceSubject);
  }

  public checkContractAvailability(): Observable<boolean> {
    return from(this.web3.eth.getCode(this.contractInfo.address)).pipe(
      map(bytecode => bytecode !== '0x'),
      catchError(err => {
        this._snackBar.open(err.message, 'Dismiss');
        throw err;
      })
    );
  }

  public getBalanceOf(address: string): Observable<any> {
    return from(this.contract.methods['balanceOf'](address).call()).pipe(
      catchError(err => {
        this._snackBar.open(err.message, 'Dismiss');
        throw err;
      })
    );
  }

  public transfer(toAddress: string, amount: number) {
    return from(
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
        this._snackBar.open(err.message, 'Dismiss');
        throw err;
      })
    );
  }
}
