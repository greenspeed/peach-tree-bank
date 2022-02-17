import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transfer-confirm',
  templateUrl: './transfer-confirm.component.html',
  styleUrls: ['./transfer-confirm.component.scss'],
})
export class TransferConfirmComponent {
  @Input() amount: number | undefined;
  @Input() toAccount: string | undefined;

  constructor(public activeModal: NgbActiveModal) {}
}
