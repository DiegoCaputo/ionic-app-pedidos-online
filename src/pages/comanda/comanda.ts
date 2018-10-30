import { ComandaService } from './comanda.service';
import { Funcoes } from './../../providers/funcoes';
import { Cadastro } from './../cadastro/cadastro';
import { FinalizarPedido } from './../finalizar-pedido/finalizar-pedido';
import { Cardapio } from './../cardapio/cardapio';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment } from 'ionic-angular';

@Component({
  selector: 'page-comanda',
  templateUrl: 'comanda.html',
})
export class Comanda implements OnInit {

  comandaClass: this;
  loader: any;
  itens: any;
  total: Number = 0.0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private funcoes: Funcoes,
    private comandaService: ComandaService) {
    this.comandaClass = this;
    this.itens = JSON.parse(sessionStorage.getItem('comanda'))

    if (this.itens !== null) {
      this.total = this.getTotal();
    }
  }

  pushToCardapio() {
    this.navCtrl.push(Cardapio, {
      id: sessionStorage.getItem('idAutenticacao')
    })
  }

  pushToFinalizarPedido() {
    this.navCtrl.push(FinalizarPedido, {
      id: sessionStorage.getItem('idAutenticacao')
    })
  }

  pushToCadastro() {
    this.navCtrl.push(Cadastro, {
      id: sessionStorage.getItem('idAutenticacao')
    })
  }

  pagarNoCaixa() {
    this.comandaService.fecharComanda(this.total, 3).then(
      response => {
        sessionStorage.removeItem("comanda")

        let botoes = [
          {
            text: 'Ok',
            role: 'ok',
            handler: () => {
              this.pushToCardapio();
            }
          }
        ]
        this.funcoes.mostrarAlertDeConfirmacao("PEDIDO Nº " + response.numeroComanda, "Obrigado, para efetuar o pagamento, basta informar o número do pedido no caixa !", botoes);
      })
  }

  getTotal() {

    let total: any = '0.0';
    console.log(this.itens);
    for (var i = 0; i < this.itens.length; i++) {
      total = parseFloat(total) + parseFloat(this.itens[i][0].valorTotal);
    }

    return total;
  }

  ngOnInit() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

}
