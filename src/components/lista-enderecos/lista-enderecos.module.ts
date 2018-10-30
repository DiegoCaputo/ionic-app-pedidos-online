import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ListaEnderecosComponent } from './lista-enderecos';
import { EnderecosService } from '../../pages/enderecos/enderecos.service';

@NgModule({
  declarations: [
    ListaEnderecosComponent,
  ],
  imports: [
    IonicPageModule.forChild(ListaEnderecosComponent),
  ],
  exports: [
    ListaEnderecosComponent
  ], providers: [
    EnderecosService
  ]
})
export class ListaEnderecosComponentModule {}
