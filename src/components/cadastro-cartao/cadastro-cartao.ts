import { CartaoService } from './../../pages/cartao/cartao.service';
import { FinalizarPedidoService } from './../../pages/finalizar-pedido/finalizar-pedido.service';
import { Cartao } from './../../pages/cartao/cartao';
import { Component, ViewChild, Input } from '@angular/core';
import { Funcoes } from './../../providers/funcoes';

declare var PagSeguroDirectPayment;

@Component({
  selector: 'cadastro-cartao',
  templateUrl: 'cadastro-cartao.html'
})

export class CadastroCartao {

  text: string;
  loader: any;
  paymentMethods: Array<any>;
  brandImage = '';
  click: Boolean;
  existe: Boolean;

  @ViewChild('creditCardNum') creditCardNum;
  @ViewChild('creditCardMonthExp') creditCardMonthExp;
  @ViewChild('creditCardYearExp') creditCardYearExp;
  @ViewChild('creditCardCvv') creditCardCvv;

  creditCard = {
    num: '',
    cvv: '',
    monthExp: '',
    yearExp: '',
    brand: '',
    token: ''
  };

  constructor(public funcoes: Funcoes,
    private finalizarPedidoService: FinalizarPedidoService,
    private cartaoService: CartaoService,
    private cartao: Cartao) {
      this.click = false;
      this.existe = false;
      this.loader = this.funcoes.mostraLoading("");

      try {
        this.finalizarPedidoService.getSession()
          .then(paymentMethods => {
              //this.paymentMethods = JSON.parse(sessionStorage.getItem('metodosDePagamento'));
              //this.loader.dismiss();
              this.getPaymentMethods();
          });
      } catch (error) {
        alert(error);
      }
  }

  ngOnInit() {}

  getPaymentMethods(): void {

    this.loader.dismiss();

    PagSeguroDirectPayment.getPaymentMethods({
      success: response => {
        let paymentMethods = response.paymentMethods;
        this.paymentMethods = Object.keys(paymentMethods).map((k) => paymentMethods[k]);

        //sessionStorage.setItem('metodosDePagamento', JSON.stringify(this.paymentMethods));
      },
      error: function (error) {
        alert(error);
      }
    });

  }

  getCreditCardBrand() {

    PagSeguroDirectPayment.getBrand({
      cardBin: this.creditCard.num,
      success: response => {
        this.creditCard.brand = response.brand.name
        this.brandImage = 'https://stc.pagseguro.uol.com.br' + this.paymentMethods[3]['options'][response.brand.name.toUpperCase()]['images']['SMALL']['path'];
        this.loader.dismiss();
      },
      error: response => {
        this.funcoes.mostrarAlertDeErro("Erro", "Número de cartão inválido !");
        this.loader.dismiss();
      }
    });

  }

  getCreditCardToken() {

    if (this.creditCard.num == "") {
      this.loader.dismiss();
      this.creditCardNum.setFocus();
    } else if (this.creditCard.cvv == "") {
      this.loader.dismiss();
      this.creditCardCvv.setFocus();
    } else if (this.creditCard.monthExp == "") {
      this.loader.dismiss();
      this.creditCardMonthExp.setFocus();
    } else if (this.creditCard.yearExp == "") {
      this.loader.dismiss();
      this.creditCardYearExp.setFocus();
    } else {

      this.loader = this.funcoes.mostraLoading("");
      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.creditCard.num,
        brand: this.creditCard.brand,
        cvv: this.creditCard.cvv,
        expirationMonth: this.creditCard.monthExp,
        expirationYear: this.creditCard.yearExp,
        success: response => {
          this.creditCard.token = response.card.token
          this.salvarCartao();
        },
        error: response => {
          this.funcoes.mostrarAlertDeErro("Erro", "Verifique os dados do cartão !")
          this.limparCampos();
          this.loader.dismiss();
        }
      });
    }
  }

  salvarCartao() {

    if (!this.existe) {

      this.click = true;

      let cartao = {
        cardNumber: this.creditCard.num,
        brand: this.creditCard.brand,
        cvv: this.creditCard.cvv,
        expirationMonth: this.creditCard.monthExp,
        expirationYear: this.creditCard.yearExp
      }

      try {
        this.cartaoService.salvar(cartao, this.brandImage)
          .then(response => {
            this.loader.dismiss();
            this.limparCampos();
            this.cartao.setarCartoes().then(
              _ => this.cartao.setarOpcao('cadastrados')
            );
          });
      } catch (error) {
        this.loader.dismiss();
        alert(error);
      }

    } else {
      this.funcoes.mostrarAlertDeErro("Erro", "Cartão ja existente !");
      this.limparCampos();
      this.loader.dismiss();
    }

  }

  verificarCartaoExistente() {
    this.existe = false;
    //this.getCreditCardToken();
    try {
      this.cartaoService.listar()
        .then(cartoesExistentes => this.existe = this.existeCartao(cartoesExistentes))
        .then(response => this.getCreditCardToken());
    } catch (error) {
      this.loader.dismiss();
      alert(error);
    }
  }

  existeCartao(cartoesExistentes): Boolean {

    let existe = false;
    cartoesExistentes.forEach(element => {
      if (this.creditCard.num == element.split("!@")[0]) {
        existe = true;
      }
    });

    return existe;

  }

  verificarBandeira(ev) {
    if (ev.target.value.length == 16) {
      this.loader = this.funcoes.mostraLoading("");
      this.getCreditCardBrand();
    }
  }

  limparCampos() {
    this.creditCard.num = "";
    this.creditCard.cvv = "";
    this.creditCard.monthExp = "";
    this.creditCard.yearExp = "";
    this.brandImage = "";
    this.click = false;
  }


}
