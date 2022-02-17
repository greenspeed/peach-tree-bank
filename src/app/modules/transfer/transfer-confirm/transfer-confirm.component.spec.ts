import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoCommaPipe } from 'src/app/shared/pipes/no-comma.pipe';

import { TransferConfirmComponent } from './transfer-confirm.component';

describe('TransferConfirmComponent', () => {
  let component: TransferConfirmComponent;
  let fixture: ComponentFixture<TransferConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferConfirmComponent, NoCommaPipe],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
