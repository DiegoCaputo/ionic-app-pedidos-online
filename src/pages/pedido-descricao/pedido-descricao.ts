import { Bandeija } from './../bandeija/bandeija';
import { ComprovantePage } from './../comprovante/comprovante';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { PedidoDescricaoService } from './pedidos-descricao.service';
import { Funcoes } from './../../providers/funcoes';
import { Pedidos } from './../pedidos/pedidos';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pedido-descricao',
  templateUrl: 'pedido-descricao.html',
})
export class PedidoDescricaoPage implements OnInit {

  pedido: Pedidos;
  loader: any;
  itens: CardapioItem[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public funcoes: Funcoes,
    public pedidoDescricaoService: PedidoDescricaoService) {
    this.pedido = this.navParams.get('pedido');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading("");
    this.buscarItensDoPedido();
  }

  buscarItensDoPedido() {
    this.pedidoDescricaoService.getItens(this.pedido)
      .then(itens => {
        this.itens = itens
        this.loader.dismiss()
      })
  }

  pushToComprovante(itens) {
    this.navCtrl.push(ComprovantePage, {
      itens: itens
    })
  }

  repetirPedido(itens) {

    let array: Array<any> = new Array;
    let bandeija: Array<any> = new Array;

    console.log(JSON.parse(sessionStorage.getItem('bandeija')));
    if (sessionStorage.getItem('bandeija') != null) {
      array = JSON.parse(sessionStorage.getItem('bandeija'));
    }

    for (var i = 0; i < itens.length; i++) {
      array.push(itens[i]);
    }

    sessionStorage.setItem('bandeija', JSON.stringify(array));

    bandeija = JSON.parse(sessionStorage.getItem('bandeija'));

    this.navCtrl.setRoot(Bandeija, {
      objeto: bandeija,
      reload: true
    });
  }

}
