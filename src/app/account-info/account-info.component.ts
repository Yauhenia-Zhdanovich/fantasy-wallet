import { Component } from '@angular/core';
import { Observable, filter, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConvertFromWeiPipe } from '../../ethereum/pipes/convert-from-wei.pipe';
import { AddressService } from '../../ethereum/services/address.service';
import { EthereumBalanceService } from '../../ethereum/services/ethereum-balance.service';
import { ChainService } from '../../ethereum/services/chain.service';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule, ConvertFromWeiPipe],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent {
  public address: Observable<string> = this.addressService.address$;
  public chain: Observable<string> = this.chainService.chain$;
  public ethBalance: Observable<string> = this.addressService.address$.pipe(
    filter(address => !!address),
    switchMap(address => this.ethereumBalanceService.fetchBalance(address))
  );

  constructor(
    private addressService: AddressService,
    private ethereumBalanceService: EthereumBalanceService,
    private chainService: ChainService
  ) {}
}
