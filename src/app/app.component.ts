import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SmartContractService } from '../ethereum/contracts/abstract-contract.service';
import { CONTRACTS } from '../ethereum/contracts/contract.token';
import { TokensComponent } from './tokens/tokens.component';
import { MatDividerModule } from '@angular/material/divider';
import { AccountInfoComponent } from './account-info/account-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    AccountInfoComponent,
    TokensComponent,
    MatDividerModule,
  ],
})
export class AppComponent {
  constructor(
    @Inject(CONTRACTS) private contracts: ReadonlyArray<SmartContractService>
  ) {}

  onClick() {
    console.log('onclick');
    this.contracts[0].transfer(
      '0xb780F89d37864492A81c7B0053879486d259f16C',
      0.0
    );
  }
}
