import { ListaEnderecosComponentModule } from './../../components/lista-enderecos/lista-enderecos.module';
import { EnderecosService } from './enderecos.service';
import { CadastroEnderecoComponentModule } from './../../components/cadastro-endereco/cadastro-endereco.module';
import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { EnderecosPage } from './enderecos';

@NgModule({
  declarations: [],
  imports: [
    IonicPageModule.forChild(EnderecosPage),
    LayoutModule,
    IonicModule,
    ListaEnderecosComponentModule
  ],
  exports: []
})
export class EnderecosPageModule {}
