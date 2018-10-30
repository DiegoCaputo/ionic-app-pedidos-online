import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Cardapio } from './../cardapio/cardapio';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-scanear-qr',
  templateUrl: 'scanear-qr.html',
})
export class ScanearQrPage {

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private navParams: NavParams) { }

  private options: BarcodeScannerOptions;

  scanQr(): void {

    this.options = {
      prompt: ''
    }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      sessionStorage.setItem('mesa', barcodeData.text.split('-')[1]);
      sessionStorage.setItem('idAutenticacao', barcodeData.text);
      this.navCtrl.setRoot(Cardapio);

    }, (err) => {

    });
  }


  ionViewDidLoad() {
    this.scanQr();

    /*sessionStorage.setItem('mesa','001');
      sessionStorage.setItem('idAutenticacao', '1-001');
      this.navCtrl.setRoot(Cardapio, {
        id: sessionStorage.getItem('idAutenticacao'),
      });*/
  }

}
