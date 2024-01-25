import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AccountInfoComponent } from './account/account-info/account-info/account-info.component';
import { SmartContractService } from '../ethereum/contracts/abstract-contract.service';
import { CONTRACTS } from '../ethereum/contracts/contract.token';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, MatCardModule, AccountInfoComponent],
})
export class AppComponent {
  constructor(
    @Inject(CONTRACTS) private contracts: ReadonlyArray<SmartContractService>
  ) {}

  ngOnInit() {
    this.contracts[0].getBalanceOf(
      '0xb780F89d37864492A81c7B0053879486d259f16C'
    );
    this.contracts[1].getBalanceOf(
      '0xb780F89d37864492A81c7B0053879486d259f16C'
    );
  }
}
