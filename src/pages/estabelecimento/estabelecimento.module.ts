import { LayoutModule } from './../../app/layout.module';
import { BandeijaIcon } from './../../components/bandeija-icon/bandeija-icon';
import { Footer } from './../../components/footer/footer';
import { Header } from './../../components/header/header';
import { Box } from './../../components/box/box';
import { Estabelecimento } from './estabelecimento';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    Estabelecimento,
    Box,
    Header,
    Footer,
    BandeijaIcon
  ],
  imports: [
    IonicPageModule.forChild(Estabelecimento),
    IonicModule,
    LayoutModule
  ],
  exports: [
    Estabelecimento
  ]
})
export class EstabelecimentoModule { }