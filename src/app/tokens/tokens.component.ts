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
  forkJoin,
  switchMap,
} from 'rxjs';
import { ChainService } from '../../ethereum/services/chain.service';

@Component({
  selector: 'tokens',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss',
})
export class TokensComponent {
  constructor(
    @Inject(CONTRACTS) private contracts: ReadonlyArray<SmartContractService>,
    private ethereumBalanceService: EthereumBalanceService,
    private addressService: AddressService,
    private chainService: ChainService
  ) {}

  ngOnInit() {
    combineLatest([
      this.chainService.chain$.pipe(filter(value => !!value)),
      this.addressService.address$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        switchMap(([chain, address]) => {
          console.log(chain, address);
          return forkJoin([
            ...this.contracts.map(contract => contract.getBalanceOf(address)),
            this.ethereumBalanceService.fetchBalance(address),
          ]);
        })
      )
      .subscribe(val => {
        console.log(val);
      });
    // forkJoin([this.addressService])
    // merge(...this.contracts.map(contract => contract.getBalanceOf(this.addressService))).subscribe(console.log);
    // concatAll([])
    // this.contracts.forEach((contract) => {
  }
}
