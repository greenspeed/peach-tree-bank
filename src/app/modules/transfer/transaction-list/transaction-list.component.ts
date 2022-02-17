import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransferService } from '../transfer.service';
import { CurrencyPipe } from '@angular/common';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { TransactionFilterPipe } from 'src/app/shared/pipes/transaction-filter.pipe';
import { ITransfer } from './../transfer.model';
import { CustomCurrencyPipe } from './../../../shared/pipes/custom-currency.pipe';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  providers: [CustomCurrencyPipe, CurrencyPipe, TransactionFilterPipe],
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactions: ITransfer[] = [];
  filterTerm: string = '';
  private onDestroy$ = new Subject<void>();

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.transferService.transactions$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(
        map((result) => {
          result.sort((a: ITransfer, b: ITransfer) => {
            return (
              new Date(b.dates.valueDate).getTime() -
              new Date(a.dates.valueDate).getTime()
            );
          });
          return result;
        })
      )
      .subscribe((resp) => {
        this.transactions = resp;
      });

    this.transferService.getTransactions().subscribe((resp) => {
      this.transferService.updateTransactions(resp);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  inputChange(event: any) {
    this.filterTerm = event;
  }
}
