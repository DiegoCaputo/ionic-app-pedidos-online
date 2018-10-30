import { ScanearQrPage } from './../scanear-qr/scanear-qr';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Cardapio } from './../cardapio/cardapio';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    
  }

  pushToScanearQr(){
    this.navCtrl.push(ScanearQrPage);
    sessionStorage.setItem("localizacaoDoUsuario","1");
  }

  pushToCardapio(){
    this.navCtrl.push(Cardapio);
    sessionStorage.setItem('idAutenticacao', '1-0');
    sessionStorage.setItem("localizacaoDoUsuario","2");
  }
}
