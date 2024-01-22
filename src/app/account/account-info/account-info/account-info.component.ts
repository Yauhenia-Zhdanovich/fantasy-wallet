import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../../account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent {
  public address: Observable<string> = this.accountService.address$;

  constructor(private accountService: AccountService) {}
}
