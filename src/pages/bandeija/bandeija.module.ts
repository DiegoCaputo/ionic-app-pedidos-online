import { ItemModule } from './../../components/item/item.module';
import { CardapioItemModule } from './../cardapio-item/cardapio-item.module';
import { FooterModule } from './../../components/footer/footer.module';
import { BoxModule } from './../../components/box/box.module';
import { HeaderModule } from './../../components/header/header.module';
import { BandeijaIconModule } from './../../components/bandeija-icon/bandeija-icon.module';
import { BandeijaService } from './bandeija.service';
import { Bandeija } from './bandeija';
import { Cardapio } from './cardapio';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { OpcoesCheckoutPage } from '../opcoes-checkout/opcoes-checkout';

@NgModule({
  declarations: [
    Bandeija
  ],
  imports: [
    IonicPageModule.forChild(Bandeija),
    IonicModule,
    HeaderModule,
    BoxModule,
    BandeijaIconModule,
    FooterModule,
    ItemModule
  ],
  exports: [Bandeija],
  entryComponents: [
    Bandeija,
    OpcoesCheckoutPage
  ],
  providers: [
    BandeijaService
  ]
})
export class BandeijaModule { }