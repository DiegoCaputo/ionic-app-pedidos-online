import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ScanearQrPage } from './scanear-qr';

@NgModule({
  declarations: [
    ScanearQrPage,
  ],
  imports: [
    LayoutModule,
    IonicModule
  ],
  exports: [
    ScanearQrPage
  ]
})
export class ScanearQrPageModule {}
