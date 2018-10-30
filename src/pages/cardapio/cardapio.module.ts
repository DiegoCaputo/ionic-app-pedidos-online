import { LayoutModule } from './../../app/layout.module';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { CardapioService } from './cardapio.service';
import { FooterModule } from './../../components/footer/footer.module';
import { BandeijaIconModule } from './../../components/bandeija-icon/bandeija-icon.module';
import { BoxModule } from './../../components/box/box.module';
import { HeaderModule } from './../../components/header/header.module';
import { EstabelecimentoService } from './../estabelecimento/estabelecimento.service';
import { Cardapio } from './cardapio';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    Cardapio,
    CardapioItem
  ],
  imports: [
    IonicPageModule.forChild(Cardapio),
    IonicModule,
    LayoutModule
  ],
  exports: [
    Cardapio
  ],
  entryComponents: [
    Cardapio,
    CardapioItem
  ],
  providers: [
    EstabelecimentoService,
    CardapioService
  ]
})
export class CardapioModule { }