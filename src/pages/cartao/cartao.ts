import { FinalizarPedidoService } from './../finalizar-pedido/finalizar-pedido.service';
import { Funcoes } from './../../providers/funcoes';
import { CartaoService } from './cartao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment, LoadingController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

declare var PagSeguroDirectPayment;

@Component({
  selector: 'page-cartao',
  templateUrl: 'cartao.html',
})

@Injectable()
export class Cartao implements OnInit {

  @ViewChild(Segment)
  @ViewChild('creditCardNum') creditCardNum;
  @ViewChild('creditCardMonthExp') creditCardMonthExp;
  @ViewChild('creditCardYearExp') creditCardYearExp;
  @ViewChild('creditCardCvv') creditCardCvv;

  pagamento: boolean;
  cartaoClass: this;
  loader: any;
  itens: Array<any>;
  total: any = 0.0;
  segment: Segment;
  pessoa: Array<any>;
  opcao = 'cadastro';
  brandImage = '';
  click: boolean;
  cartoes: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartaoService: CartaoService,
    private funcoes: Funcoes,
    private finalizarPedidoService: FinalizarPedidoService,
    private alertCtrl: AlertController
  ) {
    this.click = false;
    this.cartaoClass = this;
    this.pagamento = false;
  }

  ngOnInit() {

    //this.finalizarPedidoService.getSession()
      //.then(paymentMethods => this.getPaymentMethods())
  }

  getCartoes() {
    return this.cartaoService.listar().then(response => this.cartoes = this.montarListaDeCartoes(response));
  }

  montarListaDeCartoes(c): Array<any> {

    let cartoes: Array<any> = new Array;

    for (var i = 0; i < c.length; i++) {

      if (c[i].split('!@')[0] !== "") {

        let numero = c[i].split('!@')[0];
        let numeroReal = numero;
        numero = "**** **** **** " + numero.substring(numero.length - 4);

        let cartao = {
          numeroReal: numeroReal,
          numero: numero,
          bandeira: c[i].split('!@')[1],
          cvv: c[i].split('!@')[2],
          mes: c[i].split('!@')[3],
          ano: c[i].split('!@')[4]
        }

        try {
          cartoes.push(cartao);
        } catch (Exception) {
          alert(Exception)
        }
      }
    }

    return cartoes;
  }

  mostrarConfirmacaoRemocaoDeCartao(cartao) {

    let botoes = [
      {
        text: 'Sim',
        role: 'sim',
        handler: () => {
          this.removerCartao(cartao);
        }
      },
      {
        text: 'Não',
        role: 'não',
        handler: () => {
          ['Dismiss']
        }
      }
    ]

    let titulo = "Ação Necessária";
    let mensagem = "Deseja excluir o cartão ?"

    this.funcoes.mostrarAlertDeConfirmacao(titulo, mensagem, botoes);
  }

  removerCartao(cartao) {

    let texto: String = '';

    this.cartoes.forEach(function (element, index) {

      let c = Object.keys(element).map((k) => element[k]);

      let numeroCartaoReal = c[0];
      let numeroCartao = c[1];

      if (numeroCartao.substring(numeroCartao.length - 4) !== cartao.numero.substring(cartao.numero.length - 4)) {
        texto += numeroCartaoReal + '!@' + numeroCartao + '!@' + c[2] + '!@' + c[3] + '!@' + c[4] + '!@' + c[5];
        texto += '|';
      }
    });

    this.cartaoService.escrever(texto).then(response => {
      this.cartoes = this.montarListaDeCartoes(texto.split("|"));
    });
  }

  public setarOpcao(opcao): void{
    this.opcao = opcao;
  }

  setarCartoes(): Promise<any>{
    return this.getCartoes();
  }
}
