import { CardapioItemDescricaoService } from './cardapio-item-descricao.service';
import { LayoutModule } from './../../app/layout.module';
import { CardapioItemService } from './../cardapio-item/cardapio-item.service';
import { Bandeija } from './../bandeija/bandeija';
import { CardapioItemDescricao } from './../cardapio-item-descricao/cardapio-item-descricao';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [],
  imports: [
    IonicPageModule.forChild(CardapioItemDescricao),
    IonicModule,
    LayoutModule
  ],
  exports: [],
  entryComponents: [
    Bandeija
  ],
  providers: [
    CardapioItemService,
    CardapioItemDescricaoService
  ]
})
export class CardapioItemDescricaoModule { }