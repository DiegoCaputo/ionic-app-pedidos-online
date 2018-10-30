import { ItemComprovanteComponentModule } from './../../components/item-comprovante/item-comprovante.module';
import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ComprovantePage } from './comprovante';

@NgModule({
  declarations: [
    ComprovantePage,
  ],
  imports: [
    IonicPageModule.forChild(ComprovantePage),
    IonicModule,
    LayoutModule,
    ItemComprovanteComponentModule
  ],
  exports: [ComprovantePage]
})
export class ComprovantePageModule {}