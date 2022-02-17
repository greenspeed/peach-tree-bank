import { CustomCurrencyPipe } from './../../shared/pipes/custom-currency.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BbUIModule } from '../bb-ui/bb-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferConfirmComponent } from './transfer-confirm/transfer-confirm.component';
import { NoCommaPipe } from 'src/app/shared/pipes/no-comma.pipe';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TransactionFilterPipe } from 'src/app/shared/pipes/transaction-filter.pipe';

@NgModule({
  declarations: [
    MakeTransferComponent,
    TransferConfirmComponent,
    NoCommaPipe,
    CustomCurrencyPipe,
    TransactionFilterPipe,
    TransactionListComponent,
  ],
  imports: [CommonModule, BbUIModule, ReactiveFormsModule, HttpClientModule],
  exports: [MakeTransferComponent, TransactionListComponent],
})
export class TransferModule {}
