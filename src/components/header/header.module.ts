import { BandeijaIconModule } from './../bandeija-icon/bandeija-icon.module';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { Header } from './header';

@NgModule({
  declarations: [
    Header,
  ],
  imports: [IonicModule,BandeijaIconModule],
  exports: [
    Header
  ]
})
export class HeaderModule {

}
