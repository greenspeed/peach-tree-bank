import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferConfirmComponent } from '../transfer-confirm/transfer-confirm.component';
import { TransferService } from '../transfer.service';
import { NoCommaPipe } from './../../../shared/pipes/no-comma.pipe';
import {
  ICreditDebitIndicator,
  ICurrencyCode,
  ITransfer,
} from './../transfer.model';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
  providers: [CurrencyPipe, NoCommaPipe],
})
export class MakeTransferComponent implements OnInit {
  @Input() balance: number = 5824.76;
  balanceDisplayText = this.getBalanceDisplayText();
  transferForm: FormGroup | undefined;
  formSubmitted: boolean = false;

  get amount() {
    return (
      this.transferForm && (this.transferForm.get('amount') as FormControl)
    );
  }

  get toAccount() {
    return (
      this.transferForm && (this.transferForm.get('toAccount') as FormControl)
    );
  }

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private noCommaPipe: NoCommaPipe,
    private modalService: NgbModal,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccount: [this.balanceDisplayText],
      toAccount: [null, [Validators.required]],
      amount: [
        null,
        [
          Validators.required,
          Validators.min(0),
          this.validateAmount.bind(this),
        ],
      ],
    });
  }

  submit(myForm: NgForm) {
    this.formSubmitted = true;

    if (this.transferForm?.invalid) {
      return;
    }

    const modalRef = this.modalService.open(TransferConfirmComponent);
    modalRef.componentInstance.amount =
      this.transferForm && this.transferForm.controls.amount.value;
    modalRef.componentInstance.toAccount =
      this.transferForm && this.transferForm.controls.toAccount.value;

    modalRef.result.then(
      (result) => {
        this.formSubmitted = false;

        if (result) {
          // TODO: update the transaction by calling API;
          const transaction = this.createTransactionRequest(
            this.transferForm && this.transferForm.controls.toAccount.value,
            this.transferForm && this.transferForm.controls.amount.value
          );
          this.transferService.addTransaction(transaction);
          this.balance =
            this.balance -
            +(this.transferForm && this.transferForm.controls.amount.value);
          this.balanceDisplayText = this.getBalanceDisplayText();

          myForm.resetForm();
          this.transferForm?.patchValue({
            fromAccount: this.balanceDisplayText,
          });
        }
      },
      (reason) => {
        console.log(`Dismissed ${reason}`);
      }
    );
  }

  validateAmount(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && this.balance - control.value < 500) {
      return { amountInvalid: true };
    }

    return null;
  }

  createTransactionRequest(toAccount: string, amount: number): ITransfer {
    return {
      id: Date.now().toString(),
      merchant: {
        name: toAccount,
        accountNumber: Math.floor(Math.random() * 100).toString(),
      },
      dates: { valueDate: new Date().getTime() },
      categoryCode: '#e25a2c',
      transaction: {
        type: 'Online Transfer',
        creditDebitIndicator: ICreditDebitIndicator.Dbit,
        amountCurrency: {
          currencyCode: ICurrencyCode.Eur,
          amount: amount,
        },
      },
    };
  }

  getBalanceDisplayText(): string {
    return `My Personal Account: ${this.noCommaPipe.transform(
      this.currencyPipe.transform(this.balance, 'EUR', '€ ')
    )}`;
  }
}
