import { Comanda } from './../../pages/comanda/comanda';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'custom-footer',
  templateUrl: 'footer.html'
})

export class Footer {
  text: string;
  comanda: any;

  constructor(private navCtrl: NavController) {
    this.comanda = sessionStorage.getItem('comanda');
  }

  pushToComanda(){
    this.navCtrl.setRoot(Comanda);
  }

}