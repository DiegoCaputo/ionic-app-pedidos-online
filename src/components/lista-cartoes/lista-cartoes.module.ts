import { CartaoService } from './../../pages/cartao/cartao.service';
import { FinalizarPedidoService } from './../../pages/finalizar-pedido/finalizar-pedido.service';
import { FinalizarPedido } from './../../pages/finalizar-pedido/finalizar-pedido';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListaCartoesComponent } from './lista-cartoes';

@NgModule({
  declarations: [
    ListaCartoesComponent,
  ],
  imports: [IonicModule],
  exports: [
    ListaCartoesComponent
  ],
  providers :[CartaoService,FinalizarPedidoService]
})
export class ListaCartoesComponentModule {}
