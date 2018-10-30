import { ComandaDescricaoPage } from './../comanda-descricao/comanda-descricao';
import { LayoutModule } from './../../app/layout.module';
import { ComandaService } from './../comanda/comanda.service';
import { HeaderModule } from './../../components/header/header.module';
import { FooterModule } from './../../components/footer/footer.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ComandasPage } from './comandas';

@NgModule({
  declarations: [
    ComandasPage
  ],
  imports: [
    IonicPageModule.forChild(ComandasPage),
    LayoutModule
  ],
  exports: [
    ComandasPage
  ],
  providers: [
    ComandaService
  ],
  entryComponents: [
    ComandaDescricaoPage
  ]
})
export class ComandasPageModule { }
