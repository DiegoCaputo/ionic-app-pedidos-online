import { LayoutModule } from './../../app/layout.module';
import { HeaderModule } from './../../components/header/header.module';
import { BoxModule } from './../../components/box/box.module';
import { BandeijaIconModule } from './../../components/bandeija-icon/bandeija-icon.module';
import { FooterModule } from './../../components/footer/footer.module';
import { CardapioItemService } from './cardapio-item.service';
import { CardapioItemDescricao } from './../cardapio-item-descricao/cardapio-item-descricao';
import { CardapioItem } from './cardapio-item';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';     // contains angular2 components like *ngIf

@NgModule({
  declarations: [
    CardapioItemDescricao
  ],
  imports: [
    IonicPageModule.forChild(CardapioItem),
    IonicModule,
    LayoutModule
  ],
  exports: [],
  entryComponents: [
    CardapioItemDescricao
  ],
  providers: [
    CardapioItemService
  ]
})
export class CardapioItemModule { }