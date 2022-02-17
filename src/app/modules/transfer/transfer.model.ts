export interface ITransfer {
  id: string;
  merchant: IMerchant;
  dates: IDates;
  categoryCode: string;
  transaction: ITransaction;
}

export interface IDates {
  valueDate: number | string;
}

export interface IMerchant {
  name: string;
  accountNumber: string;
}

export interface ITransaction {
  type: string;
  creditDebitIndicator: ICreditDebitIndicator;
  amountCurrency: IAmountCurrency;
}

export interface IAmountCurrency {
  currencyCode: ICurrencyCode;
  amount: number | string;
}

export enum ICurrencyCode {
  Eur = 'EUR',
}

export enum ICreditDebitIndicator {
  Crdt = 'CRDT',
  Dbit = 'DBIT',
}
