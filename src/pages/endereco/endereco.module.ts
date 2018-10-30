import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { EnderecoPage } from './endereco';
import { ListaEnderecosComponentModule } from '../../components/lista-enderecos/lista-enderecos.module';
import { PedidoConfirmadoPage } from '../pedido-confirmado/pedido-confirmado';

@NgModule({
  declarations: [
    EnderecoPage
  ],
  imports: [
    IonicPageModule.forChild(EnderecoPage),
    LayoutModule,
    IonicModule,
    ListaEnderecosComponentModule
  ],
  exports: [
    EnderecoPage
  ]
})
export class EnderecoPageModule {}
