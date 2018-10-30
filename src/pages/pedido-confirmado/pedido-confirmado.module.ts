import { BandeijaService } from './../bandeija/bandeija.service';
import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { PedidoConfirmadoPage } from './pedido-confirmado';

@NgModule({
  declarations: [
    PedidoConfirmadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoConfirmadoPage),
    LayoutModule,
    IonicModule
  ],
  exports: [
    PedidoConfirmadoPage
  ]
})
export class PedidoConfirmadoPageModule {}
