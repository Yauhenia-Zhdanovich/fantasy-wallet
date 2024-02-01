import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CONTRACTS } from '../../ethereum/contracts/contract.token';
import { EthereumBalanceService } from '../../ethereum/services/ethereum-balance.service';
import { SmartContractService } from '../../ethereum/contracts/abstract-contract.service';
import { BalanceInfo } from '../../ethereum/contracts/interfaces';
import { AddressService } from '../../ethereum/services/address.service';
import { AbstractComponent } from '../../common/abstract.component';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ConvertFromWeiPipe } from '../../ethereum/pipes/convert-from-wei.pipe';
import { ethers } from 'ethers';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

const SUCCESS_MESSAGE = 'You have successfully transferred! Transaction hash: ';

@Component({
  selector: 'transfer',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    ConvertFromWeiPipe,
    MatButtonModule,
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent extends AbstractComponent {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  public form = new FormGroup({
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(40),
      Validators.maxLength(42),
    ]),
    asset: new FormControl(''),
    value: new FormControl('', [Validators.required]),
  });

  public tokenInfo: BalanceInfo[] = [];
  constructor(
    @Inject(CONTRACTS) private contracts: ReadonlyArray<SmartContractService>,
    private ethereumBalanceService: EthereumBalanceService,
    private addressService: AddressService,
    private _snackBar: MatSnackBar
  ) {
    super();
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
        this.tokenInfo = balances;
        this.form.get('asset')?.setValue(balances[0].symbol);
      });
  }

  public onSubmit() {
    const selectedContract = this.form.get('asset')?.value;
    this.form.disable();
    if (selectedContract === 'ETH') {
      const parsedAmount = ethers
        .parseEther(this.form.get('value')?.value?.toString() as string)
        .toString();

      this.ethereumBalanceService
        .sendEther(
          this.addressService.currentAddress,
          this.form.get('address')?.value as string,
          parsedAmount
        )
        .subscribe(({ transactionHash }) => {
          this.showSuccessMessage(transactionHash);
          this.cleanForm();
        });
    } else {
      const contract = this.contracts.find(
        contract => contract.symbol === selectedContract
      );
      contract
        ?.transfer(
          this.form.get('address')?.value as string,
          this.form.get('value')?.value as any
        )
        .subscribe(({ transactionHash }) => {
          this.showSuccessMessage(transactionHash);
          this.cleanForm();
        });
    }
  }

  public onCancel() {
    this.cleanForm();
  }

  private cleanForm = () => {
    this.form.reset();
    this.form.enable();
    this.form.get('asset')?.setValue(this.tokenInfo[0].symbol);
  };

  private showSuccessMessage = (transactionHash: string) => {
    this._snackBar.open(`${SUCCESS_MESSAGE} ${transactionHash}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  };
}
