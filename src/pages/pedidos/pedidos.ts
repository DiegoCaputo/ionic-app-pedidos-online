import { PedidoDescricaoPage } from './../pedido-descricao/pedido-descricao';
import { Funcoes } from './../../providers/funcoes';
import { PedidosService } from './pedidos.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class Pedidos {

  pedidos: Array<any>;
  loader: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pedidosService: PedidosService,
    private funcoes: Funcoes) {

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading('');
    this.getPedidos();
  }

  getPedidos() {
    this.pedidosService.get().then(pedidos => this.pedidos = pedidos).then(_ => this.loader.dismiss());
  }

  pushToPedidoDescricao(pedido) {
    this.navCtrl.push(PedidoDescricaoPage, {
      pedido: pedido
    });
  }

}
