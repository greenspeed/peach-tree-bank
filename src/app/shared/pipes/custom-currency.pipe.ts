import {
  ICreditDebitIndicator,
  ITransaction,
} from './../../modules/transfer/transfer.model';
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(public currencyPipe: CurrencyPipe) {}

  transform(value: ITransaction, ...args: unknown[]): unknown {
    let formatedByCurrencyPipe = this.currencyPipe.transform(
      value.amountCurrency.amount,
      'EUR',
      value.creditDebitIndicator === ICreditDebitIndicator.Dbit ? '€ -' : '€ ',
      '1.0-2'
    );

    return formatedByCurrencyPipe;
  }
}
