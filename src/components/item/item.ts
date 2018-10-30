import { Bandeija } from './../../pages/bandeija/bandeija';
import { Pedidos } from './../../pages/pedidos/pedidos';
import { PedidoDescricaoService } from './../../pages/pedido-descricao/pedidos-descricao.service';
import { CardapioItem } from './../../pages/cardapio-item/cardapio-item';
import { ViewController, NavParams } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class Item implements OnInit {

  itens: CardapioItem[];
  total: any = '0.0';

  @Input() tipo: String;
  @Input() pedidoItens: CardapioItem[];
  @Input('bandeija') objeto: any;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
  }

  ngOnInit() {

    console.log(this.viewCtrl.name);

    if (this.viewCtrl.name == 'Comanda') {
      this.itens = JSON.parse(sessionStorage.getItem('comanda'))
    } else if (this.viewCtrl.name == 'Bandeija') {
      this.itens = JSON.parse(sessionStorage.getItem('bandeija'))
    } else if (
      this.viewCtrl.name == 'PedidoDescricaoPage' ||
      this.viewCtrl.name == 'ComandaDescricaoPage' ||
      this.viewCtrl.name == 'PedidoConfirmadoPage') {
      console.log(this.pedidoItens);
      this.itens = this.pedidoItens;
    }

    this.total = this.getTotal();

  }

  getTotal() {

    let total: any = '0.0';

    for (var i = 0; i < this.itens.length; i++) {
      total = parseFloat(total) + parseFloat(this.itens[i][0].valorTotal);
    }

    return total;
  }
}
