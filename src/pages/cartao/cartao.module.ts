import { LayoutModule } from './../../app/layout.module';
import { FooterModule } from './../../components/footer/footer.module';
import { BandeijaIconModule } from './../../components/bandeija-icon/bandeija-icon.module';
import { BoxModule } from './../../components/box/box.module';
import { HeaderModule } from './../../components/header/header.module';
import { CommonModule } from '@angular/common';
import { ListaCartoesComponentModule } from './../../components/lista-cartoes/lista-cartoes.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { Cartao } from './cartao';

@NgModule({
  declarations: [
    Cartao,
  ],
  imports: [IonicPageModule.forChild(Cartao),
    IonicModule,
    LayoutModule
  ],
  exports: [
    Cartao
  ]
})
export class CartaoModule { }
