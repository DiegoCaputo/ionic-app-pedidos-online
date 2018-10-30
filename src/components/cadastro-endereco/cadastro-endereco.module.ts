import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { CadastroEnderecoComponent } from './cadastro-endereco';
import { EnderecosService } from '../../pages/enderecos/enderecos.service';

@NgModule({
  declarations: [
    CadastroEnderecoComponent,
  ],
  imports: [
    IonicPageModule.forChild(CadastroEnderecoComponent),
    IonicModule
  ],
  exports: [
    CadastroEnderecoComponent
  ], providers: [EnderecosService]
})
export class CadastroEnderecoComponentModule {}
