import { OpcoesCheckoutPage } from './../opcoes-checkout/opcoes-checkout';
import { Cadastro } from './../cadastro/cadastro';
import { Funcoes } from './../../providers/funcoes';
import { BandeijaService } from './bandeija.service';
import { Cardapio } from './../cardapio/cardapio';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { CardapioItemDescricao } from './../cardapio-item-descricao/cardapio-item-descricao';
import { Estabelecimento } from './../estabelecimento/estabelecimento';
import { FinalizarPedido } from './../finalizar-pedido/finalizar-pedido';
import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bandeija',
  templateUrl: 'bandeija.html',
})
export class Bandeija implements OnInit {

  bandeijaClass: this;
  bandeija = new Array;
  sessionStorageArray = new Array;
  total: any = '0.0';
  loader: any;
  cardapio: Cardapio;
  localizacaoDoUsuario: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private bandeijService: BandeijaService,
    private funcoes: Funcoes) {

  }

  ngOnInit() {
    this.bandeija = this.navParams.data.objeto;
    this.cardapio = this.navParams.data.cardapio;
    this.total = this.getTotal();
    this.bandeijaClass = this;
    this.localizacaoDoUsuario = sessionStorage.getItem("localizacaoDoUsuario");
  }

  deletarItem(index): void {
    this.total = parseFloat(this.total) - (this.bandeija[index][0].valorTotal * this.bandeija[index][0].quantidade);

    if (this.bandeija.length == 1) {
      sessionStorage.removeItem('bandeija');
      this.navCtrl.push(Cardapio, {
        id: sessionStorage.getItem('idAutenticacao'),
        bandeija: this.bandeija
      }).then(bandeija => this.bandeija = null);
    } else {

      this.bandeija.splice(index, 1);
      sessionStorage.setItem('bandeija', JSON.stringify(this.bandeija));

      this.navCtrl.setRoot(Bandeija, {
        objeto: this.bandeija,
        reload: true
      });
    }

  }

  deletarOpcional(index, index2): any {

    let opcoes: Array<any>;

    this.bandeija[index][1].splice(index2, 1);
    this.sessionStorageArray = JSON.parse(sessionStorage.getItem('bandeija'));

    this.sessionStorageArray[index][0].valorTotal = (this.sessionStorageArray[index][0].valorTotal - this.sessionStorageArray[index][1][index2].preco * this.sessionStorageArray[index][0].quantidade);

    this.total = parseFloat(this.total) - (this.sessionStorageArray[index][1][index2].preco * this.sessionStorageArray[index][0].quantidade);
    opcoes = this.sessionStorageArray[index][2];

    for (var i = 0; i < opcoes.length; i++) {
      for (var y = 0; y < opcoes[i].length; y++) {
        if (opcoes[i][y].id == this.sessionStorageArray[index][1][index2].id) {
          opcoes[i][y].selecionado = 0;
        }
      }
    }

    this.sessionStorageArray[index][1].splice(index2, 1);
    this.sessionStorageArray[index].splice(2, 1, opcoes);
    sessionStorage.setItem('bandeija', JSON.stringify(this.sessionStorageArray));

    this.bandeija = this.sessionStorageArray;

    this.navCtrl.setRoot(Bandeija, {
      objeto: this.bandeija,
      reload: true
    });

  }

  deletarMetade(idx) {

    this.sessionStorageArray = JSON.parse(sessionStorage.getItem('bandeija'));
    this.sessionStorageArray[idx][0]['metade'] = "";
    this.sessionStorageArray[idx][0]['nomeMetade'] = "";

    if (this.sessionStorageArray[idx][0]['preco'] < this.sessionStorageArray[idx][0]['precoMetade']) {
      this.sessionStorageArray[idx][0]['valorTotal'] =
        (parseFloat(this.sessionStorageArray[idx][0]['valorTotal']) -
          (((parseFloat(this.sessionStorageArray[idx][0]['precoMetade']) - parseFloat(this.sessionStorageArray[idx][0]['preco']))
            * parseFloat(this.sessionStorageArray[idx][0]['quantidade']))));

    }

    this.sessionStorageArray[idx][0]['precoMetade'] = "";

    sessionStorage.setItem('bandeija', JSON.stringify(this.sessionStorageArray));

    this.bandeija = this.sessionStorageArray;

    this.navCtrl.setRoot(Bandeija, {
      objeto: this.bandeija,
      reload: true
    });
  }

  getTotal() {

    let total: any = '0.0';

    for (var i = 0; i < this.bandeija.length; i++) {
      total = parseFloat(total) + parseFloat(this.bandeija[i][0].valorTotal);
    }

    return total;
  }

  pushToCardapioItemDescricao(item, index) {

    this.sessionStorageArray = JSON.parse(sessionStorage.getItem('bandeija'));

    let objeto = {
      item: item,
      opcoesSelecionadas: this.sessionStorageArray[index][1],
      opcoes: this.sessionStorageArray[index][2]
    };

    this.navCtrl.push(CardapioItemDescricao, {
      alterar: true,
      objeto: objeto,
      index: index,
      cardapio: this.cardapio
    })
  }

  pushToCardapio() {
    this.navCtrl.push(Cardapio, {
      id: sessionStorage.getItem('idAutenticacao'),
      bandeija: this.bandeija
    })
  }

  pushToFinalizarPedido() {
    this.navCtrl.push(FinalizarPedido, {
      id: sessionStorage.getItem('idAutenticacao'),
      bandeija: this.bandeija
    })
  }

  enviarPedido() {

    this.bandeijService.create()
      .then(response =>
        this.pushToCardapio()
      )
  }

  finalizarPedido(){
    this.navCtrl.push(OpcoesCheckoutPage);
  }

}
