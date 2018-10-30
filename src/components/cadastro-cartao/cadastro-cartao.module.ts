import { EnderecosService } from './../../pages/enderecos/enderecos.service';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { CadastroCartao } from './cadastro-cartao';

@NgModule({
  declarations: [
    CadastroCartao,
  ],
  imports: [
    IonicPageModule.forChild(CadastroCartao),
    IonicModule
  ],
  exports: [
    CadastroCartao
  ]
})
export class CadastroCartaoModule {}
