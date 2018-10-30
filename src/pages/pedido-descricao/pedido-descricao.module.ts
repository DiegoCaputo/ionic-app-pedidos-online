import { PedidoDescricaoService } from './pedidos-descricao.service';
import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { PedidoDescricaoPage } from './pedido-descricao';

@NgModule({
  declarations: [
    PedidoDescricaoPage
  ],
  imports: [
    IonicPageModule.forChild(PedidoDescricaoPage),
    LayoutModule,
    IonicModule
  ],
  exports: [
    PedidoDescricaoPage
  ],
  providers: [
    PedidoDescricaoService
  ]
})
export class PedidoDescricaoPageModule { }
