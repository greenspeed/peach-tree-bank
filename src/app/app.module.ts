import { TransferModule } from './modules/transfer/transfer.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BbUIModule } from './modules/bb-ui/bb-ui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BbUIModule, TransferModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
