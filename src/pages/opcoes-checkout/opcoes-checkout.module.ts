import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OpcoesCheckoutPage } from './opcoes-checkout';
import { EnderecoPage } from '../endereco/endereco';

@NgModule({
  declarations: [
    OpcoesCheckoutPage,
  ],
  imports: [
    LayoutModule,
    IonicModule
  ],
  entryComponents: [
    EnderecoPage
  ],
  exports: [
    OpcoesCheckoutPage
  ]
})
export class OpcoesCheckoutPageModule {}
