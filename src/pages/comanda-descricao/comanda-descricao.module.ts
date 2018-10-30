import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ComandaDescricaoPage } from './comanda-descricao';

@NgModule({
  declarations: [
    ComandaDescricaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ComandaDescricaoPage),
    LayoutModule
  ],
  exports: [
    ComandaDescricaoPage
  ]
})
export class ComandaDescricaoPageModule {}
