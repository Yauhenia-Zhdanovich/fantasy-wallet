import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConvertFromWeiPipe } from '../../ethereum/pipes/convert-from-wei.pipe';
import { AddressService } from '../../ethereum/services/address.service';
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

  constructor(
    private addressService: AddressService,
    private chainService: ChainService
  ) {}
}
