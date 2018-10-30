import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { Pedidos } from './pedidos';

@NgModule({
  declarations: [
    Pedidos,
  ],
  imports: [
    IonicPageModule.forChild(Pedidos),
    IonicModule,
    LayoutModule
  ],
  exports: [
    Pedidos
  ]
})
export class PedidosPageModule {}
