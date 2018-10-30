import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecosPage } from '../enderecos/enderecos';

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})

export class EnderecoPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  pushToEnderecos(opcao) {

    this.navCtrl.push(EnderecosPage, {
      pagamento: opcao
    });
  }

}
