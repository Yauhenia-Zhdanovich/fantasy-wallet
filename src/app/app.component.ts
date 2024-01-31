import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TokensComponent } from './tokens/tokens.component';
import { MatDividerModule } from '@angular/material/divider';
import { AccountInfoComponent } from './account-info/account-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TransferComponent } from './transfer/transfer.component';

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
    MatTabsModule,
    TransferComponent,
  ],
})
export class AppComponent {}
