import { NavController } from 'ionic-angular';
import { Cardapio } from './../../pages/cardapio/cardapio';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'box',
  templateUrl: 'box.html'
})

export class Box {

  @Input() objeto: any;
  @Input() preco: boolean;

  constructor(private navCtrl: NavController) { }

  pushPage(page: string, id: number): void {
    this.navCtrl.push(page, {
      id: JSON.parse(JSON.stringify(Cardapio)).id
    });
  }

}
