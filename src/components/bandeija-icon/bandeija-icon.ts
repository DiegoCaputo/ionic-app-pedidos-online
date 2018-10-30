import { Bandeija } from './../../pages/bandeija/bandeija';
import { NavController } from 'ionic-angular';
import { CardapioItem } from './../../pages/cardapio-item/cardapio-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bandeija-icon',
  templateUrl: 'bandeija-icon.html'
})
export class BandeijaIcon implements OnInit {

  text: string;
  bandeija = new Array;

  constructor(private navCtrl: NavController) {
    //sessionStorage.removeItem('bandeija')
    this.bandeija = JSON.parse(sessionStorage.getItem('bandeija'));
  }

  setRoot(): void {
    this.navCtrl.setRoot(Bandeija, {
      objeto: this.bandeija
    })
  }

  ngOnInit(): void { }

}
