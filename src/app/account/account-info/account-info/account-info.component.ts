import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../../account.service';
import { CommonModule } from '@angular/common';
import { ConvertFromWeiPipe } from '../../../../ethereum/pipes/convert-from-wei.pipe';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule, ConvertFromWeiPipe],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent {
  public address: Observable<string> = this.accountService.address$;
  public ethBalance: Observable<string> = this.accountService.ethBalance$;
  public wethBalance: Observable<string> = this.accountService.wethBalance$;
  constructor(private accountService: AccountService) {}
}
