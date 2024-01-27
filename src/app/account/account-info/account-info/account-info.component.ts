import { Component, Inject } from '@angular/core';
import { Observable, filter, switchMap } from 'rxjs';
import { AddressService } from '../../../../ethereum/address.service';
import { CommonModule } from '@angular/common';
import { ConvertFromWeiPipe } from '../../../../ethereum/pipes/convert-from-wei.pipe';
import { CONTRACTS } from '../../../../ethereum/contracts/contract.token';
import { SmartContractService } from '../../../../ethereum/contracts/abstract-contract.service';
import { EthereumBalanceService } from '../../../../ethereum/ethereum-balance.service';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule, ConvertFromWeiPipe],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent {
  public address: Observable<string> = this.addressService.address$;
  public ethBalance: Observable<string> = this.addressService.address$.pipe(
    filter(address => !!address),
    switchMap(address => this.ethereumBalanceService.fetchBalance(address))
  );

  constructor(
    @Inject(CONTRACTS) private contracts: ReadonlyArray<SmartContractService>,
    private addressService: AddressService,
    private ethereumBalanceService: EthereumBalanceService
  ) {}
}
