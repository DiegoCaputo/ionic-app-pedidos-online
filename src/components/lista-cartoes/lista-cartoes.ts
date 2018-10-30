import { FinalizarPedidoService } from './../../pages/finalizar-pedido/finalizar-pedido.service';
import { FinalizarPedido } from './../../pages/finalizar-pedido/finalizar-pedido';
import { CartaoService } from './../../pages/cartao/cartao.service';
import { Funcoes } from './../../providers/funcoes';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'lista-cartoes',
  templateUrl: 'lista-cartoes.html',
  providers: [FinalizarPedido]
})
export class ListaCartoesComponent {

  @Input() pagamento: boolean;

  cartoes: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartaoService: CartaoService,
    private funcoes: Funcoes,
    private finalizarPedidoService: FinalizarPedidoService,
    private alertCtrl: AlertController,
    private finalizarPedido: FinalizarPedido) {
    this.getCartoes();
  }

  getCartoes() {
    this.cartaoService.listar().then(response => this.cartoes = this.montarListaDeCartoes(response));
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
          bandeira: c[i].split('!@')[2],
          cvv: c[i].split('!@')[3],
          mes: c[i].split('!@')[4],
          ano: c[i].split('!@')[5]
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

    let titulo = "Ação necessária";
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

  confirmarPagamento(cartao) {
    this.finalizarPedido.confirmarPagamento(cartao);
  }

}
