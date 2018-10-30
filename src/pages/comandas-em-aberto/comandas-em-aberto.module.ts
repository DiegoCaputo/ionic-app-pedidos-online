import { ComandaDescricaoPage } from './../comanda-descricao/comanda-descricao';
import { LayoutModule } from './../../app/layout.module';
import { ComandaService } from './../comanda/comanda.service';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ComandasEmAbertoPage } from './comandas-em-aberto';

@NgModule({
  declarations: [
    ComandasEmAbertoPage,
  ],
  imports: [
    IonicPageModule.forChild(ComandasEmAbertoPage),
    LayoutModule
  ],
  exports: [
    ComandasEmAbertoPage
  ],
  providers: [
    ComandaService
  ],
  entryComponents: [
    ComandaDescricaoPage
  ]
})
export class ComandasEmAbertoPageModule {}
