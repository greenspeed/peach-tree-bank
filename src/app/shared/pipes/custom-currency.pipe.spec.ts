import { CurrencyPipe } from '@angular/common';
import {
  ICreditDebitIndicator,
  ICurrencyCode,
  ITransaction,
} from 'src/app/modules/transfer/transfer.model';
import { CustomCurrencyPipe } from './custom-currency.pipe';

const transaction1: ITransaction = {
  amountCurrency: {
    amount: '68.87',
    currencyCode: ICurrencyCode.Eur,
  },
  type: 'Transaction',
  creditDebitIndicator: ICreditDebitIndicator.Dbit,
};

const transaction2: ITransaction = {
  amountCurrency: {
    amount: 5000,
    currencyCode: ICurrencyCode.Eur,
  },
  type: 'Salaries',
  creditDebitIndicator: ICreditDebitIndicator.Crdt,
};

describe('CustomCurrencyPipe', () => {
  const pipe = new CustomCurrencyPipe(new CurrencyPipe('en-US'));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform "68.87" debit to "€ -68.87"', () => {
    expect(pipe.transform(transaction1)).toBe('€ -68.87');
  });

  it('transform "5000" credit to "€ 5,000"', () => {
    expect(pipe.transform(transaction2)).toBe('€ 5,000');
  });
});
