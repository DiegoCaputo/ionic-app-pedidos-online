import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Item } from './item';

@NgModule({
  declarations: [
    Item,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    Item
  ]
})
export class ItemModule { }
