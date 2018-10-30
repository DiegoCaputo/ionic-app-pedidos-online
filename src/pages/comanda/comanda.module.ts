import { LayoutModule } from './../../app/layout.module';
import { FinalizarPedidoModule } from './../finalizar-pedido/finalizar-pedido.module';
import { FinalizarPedido } from './../finalizar-pedido/finalizar-pedido';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    FinalizarPedido
  ],
  imports: [
    IonicModule,
    FinalizarPedidoModule,
    LayoutModule
  ],
  exports: []
})
export class ComandaModule { }
