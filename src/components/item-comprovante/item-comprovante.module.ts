import { LayoutModule } from './../../app/layout.module';
import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ItemComprovanteComponent } from './item-comprovante';

@NgModule({
  declarations: [
    ItemComprovanteComponent,
  ],
  imports: [
    IonicModule,
    LayoutModule
  ],
  exports: [
    ItemComprovanteComponent
  ]
})
export class ItemComprovanteComponentModule { }
