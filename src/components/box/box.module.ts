import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Box } from './box';

@NgModule({
  declarations: [
    Box,
  ],
  imports: [IonicModule],
  exports: [
    Box
  ]
})
export class BoxModule {}
