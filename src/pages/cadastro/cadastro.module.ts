import { FooterModule } from './../../components/footer/footer.module';
import { BandeijaIconModule } from './../../components/bandeija-icon/bandeija-icon.module';
import { BoxModule } from './../../components/box/box.module';
import { HeaderModule } from './../../components/header/header.module';
import { CadastroService } from './cadastro.service';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { Cadastro } from './cadastro';

@NgModule({
  declarations: [
    Cadastro
  ],
  imports: [
    IonicPageModule.forChild(Cadastro),
    IonicModule,
    HeaderModule,
    BoxModule,
    BandeijaIconModule,
    FooterModule
  ],
  exports: [
    Cadastro
  ],
  entryComponents: [
  ],
  providers: [
    CadastroService
  ]
})
export class CadastroModule {}
