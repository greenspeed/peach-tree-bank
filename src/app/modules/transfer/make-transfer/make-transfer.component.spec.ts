import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CustomCurrencyPipe } from 'src/app/shared/pipes/custom-currency.pipe';
import { NoCommaPipe } from 'src/app/shared/pipes/no-comma.pipe';
import { TransactionFilterPipe } from 'src/app/shared/pipes/transaction-filter.pipe';
import { TransferService } from '../transfer.service';

import { MakeTransferComponent } from './make-transfer.component';

class MockService {
  addTransaction(data: any) {
    console.log('add transactions' + data);
  }
}

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  const transferService = new MockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MakeTransferComponent,
        CustomCurrencyPipe,
        TransactionFilterPipe,
        NoCommaPipe,
      ],
      providers: [
        FormBuilder,
        { provide: TransferService, useValue: transferService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display from account info', () => {
    const de = fixture.debugElement.query(By.css('#from-account'));
    let el = de.nativeElement;

    expect(el.value).toBe('My Personal Account: € 5824.76');
  });
});
