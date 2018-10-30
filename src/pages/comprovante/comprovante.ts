import { CardapioItem } from './../cardapio-item/cardapio-item';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-comprovante',
  templateUrl: 'comprovante.html',
})


export class ComprovantePage implements OnInit {

  data: Date;
  id: Number;
  itens: CardapioItem[];
  pago: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itens = this.navParams.get("itens");
    this.data = this.itens[0][2]['data_hora'];
    this.id = this.itens[0][2]['id'];

    if(this.itens[0][2]['status'] == 2){
      this.pago = true;
    } else {
      this.pago = false;
    }

  }

  ngOnInit() {

  }

  ionViewDidLoad() {

  }

}
