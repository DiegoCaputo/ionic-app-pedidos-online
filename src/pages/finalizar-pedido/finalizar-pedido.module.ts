import { ItemComprovanteComponent } from './../../components/item-comprovante/item-comprovante';
import { LayoutModule } from './../../app/layout.module';
import { ListaCartoesComponentModule } from './../../components/lista-cartoes/lista-cartoes.module';
import { FooterModule } from './../../components/footer/footer.module';
import { BandeijaIconModule } from './../../components/bandeija-icon/bandeija-icon.module';
import { BoxModule } from './../../components/box/box.module';
import { HeaderModule } from './../../components/header/header.module';
import { FinalizarPedido } from './finalizar-pedido';
import { BandeijaIcon } from './../../components/bandeija-icon/bandeija-icon';
import { Footer } from './../../components/footer/footer';
import { Header } from './../../components/header/header';
import { Box } from './../../components/box/box';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    FinalizarPedido
  ],
  imports: [
    IonicPageModule.forChild(FinalizarPedido),
    IonicModule,
    LayoutModule,
    ListaCartoesComponentModule
  ],
  exports: [
    FinalizarPedido
  ]
})
export class FinalizarPedidoModule { }