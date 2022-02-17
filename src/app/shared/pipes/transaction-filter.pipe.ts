import { ITransfer } from './../../modules/transfer/transfer.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionFilter',
})
export class TransactionFilterPipe implements PipeTransform {
  transform(value: any[], term: string): any[] {
    return term
      ? value.filter((item: ITransfer) => item.merchant.name.includes(term))
      : value;
  }
}
