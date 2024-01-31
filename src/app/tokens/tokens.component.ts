import { Component, Inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CONTRACTS } from '../../ethereum/contracts/contract.token';
import { SmartContractService } from '../../ethereum/contracts/abstract-contract.service';
import { EthereumBalanceService } from '../../ethereum/services/ethereum-balance.service';
import { AddressService } from '../../ethereum/services/address.service';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { AbstractComponent } from '../../common/abstract.component';
import { CommonModule } from '@angular/common';
import { ConvertFromWeiPipe } from '../../ethereum/pipes/convert-from-wei.pipe';
import { BalanceInfo } from '../../ethereum/contracts/interfaces';
import { FirstLetterPipe } from '../../common/first-letter-pipe/first-letter.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'tokens',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    ConvertFromWeiPipe,
    FirstLetterPipe,
    MatButtonModule,
  ],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss',
})
export class TokensComponent extends AbstractComponent {
  public balances: Array<BalanceInfo> = [];

  constructor(
    @Inject(CONTRACTS) private contracts: ReadonlyArray<SmartContractService>,
    private ethereumBalanceService: EthereumBalanceService,
    private addressService: AddressService
  ) {
    super();
  }

  ngOnInit() {
    this.addressService.address$
      .pipe(
        distinctUntilChanged(),
        this.untilComponentDestroyed(),
        filter(address => !!address),
        switchMap(address => {
          return combineLatest([
            ...this.contracts.map(contract => contract.balance$),
            this.ethereumBalanceService.fetchBalance(address),
          ]);
        }),
        map(balances => balances.filter(balance => balance !== null))
      )
      .subscribe(balances => {
        this.balances = balances;
      });
  }
}
