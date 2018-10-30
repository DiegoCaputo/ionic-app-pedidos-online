import { ComprovantePage } from './../comprovante/comprovante';
import { Cartao } from './../cartao/cartao';
import { ComandaService } from './../comanda/comanda.service';
import { Cardapio } from './../cardapio/cardapio';
import { Funcoes } from './../../providers/funcoes';
import { FinalizarPedidoService } from './finalizar-pedido.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment, LoadingController, AlertController } from 'ionic-angular';

declare var PagSeguroDirectPayment;

@Component({
  selector: 'page-finalizar-pedido',
  templateUrl: 'finalizar-pedido.html',
})

export class FinalizarPedido implements OnInit {

  @ViewChild(Segment)

  loader: any;
  itens: Array<any>;
  total: any = 0.0;
  segment: Segment;
  paymentMethods: Array<any>;
  pessoa: Array<any>;
  paymentMethod = 'cartao';
  brandImage = '';

  creditCard = {
    num: '',
    cvv: '',
    monthExp: '',
    yearExp: '',
    brand: '',
    token: ''
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    private finalizarPedidoService: FinalizarPedidoService,
    private funcoes: Funcoes,
    private alertCtrl: AlertController,
    private comandaService: ComandaService) {

    this.paymentMethods = [];
    this.pessoa = JSON.parse(sessionStorage.getItem("pessoa"));
    this.itens = JSON.parse(sessionStorage.getItem('comanda'));

    if (this.itens !== null) {
      this.total = this.getTotal();
    }
  }

  ngOnInit(): any {
    this.loader = this.funcoes.mostraLoading('');
    this.finalizarPedidoService.getSession()
      .then(response => this.loader.dismiss());
  }

  paymentCreditCard() {

    this.loader = this.funcoes.mostraLoading('');
    this.getCreditCardBrand();
  }

  getCreditCardBrand() {

    PagSeguroDirectPayment.getBrand({
      cardBin: this.creditCard.num,
      success: response => {
        this.creditCard.brand = response.brand.name
        this.getCreditCardToken();
      },
      error: response => {
        alert(response);
        this.loader.dismiss();
      }
    });

  }

  getCreditCardToken() {

    try {

      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.creditCard.num,
        brand: this.creditCard.brand,
        cvv: this.creditCard.cvv,
        expirationMonth: this.creditCard.monthExp,
        expirationYear: this.creditCard.yearExp,
        success: response => {
          this.creditCard.token = response.card.token
          this.ref.detectChanges();
          this.sendPayment();
        }
      });
    } catch (error) {
      alert(error);
    }

  }

  sendPayment() {

    let params = {
      itens: this.itens,
      pessoa: this.pessoa,
      token: this.creditCard.token,
      hash: PagSeguroDirectPayment.getSenderHash(),
      method: this.paymentMethod,
      total: this.total,
      autenticacao: sessionStorage.getItem('idAutenticacao')
    }

    try {
      this.finalizarPedidoService.enviarDadosPagseguro(params)
        .then(response => {
          this.loader.dismiss();
          this.comandaService.fecharComanda(this.total, 2).then(
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
              this.funcoes.mostrarAlertDeConfirmacao("PEDIDO Nº " + response.numeroComanda, "Obrigado, o pagamento foi efetuado com sucesso, você pode visualizar seu comprovante acessando Menu > Comandas > Pagas !", botoes);
            })
        });
    } catch (error) {
      alert(error);
    }

  }

  getTotal() {

    let total: any = '0.0';

    for (var i = 0; i < this.itens.length; i++) {
      total = parseFloat(total) + parseFloat(this.itens[i][0].valorTotal);
    }

    return total;
  }

  pushToCardapio() {
    this.navCtrl.push(Cardapio, {
      id: sessionStorage.getItem('idAutenticacao')
    });
  }

  pushToCartao() {
    this.navCtrl.push(Cartao);
  }

  pushToComprovante() {
    this.navCtrl.push(ComprovantePage);
  }

  confirmarPagamento(cartao) {


    let botoes = [
      {
        text: 'Sim',
        role: 'sim',
        handler: () => {

          this.creditCard.num = cartao.numeroReal;
          this.creditCard.cvv = cartao.cvv;
          this.creditCard.monthExp = cartao.mes;
          this.creditCard.yearExp = cartao.ano;

          this.paymentCreditCard();

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

    this.funcoes.mostrarAlertDeConfirmacao("Ação Necessária", "Confirmar pagamento ?", botoes);
  }
}
