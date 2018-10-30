import { Funcoes } from './../../providers/funcoes';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoPage } from '../endereco/endereco';

@IonicPage()
@Component({
  selector: 'page-opcoes-checkout',
  templateUrl: 'opcoes-checkout.html',
})
export class OpcoesCheckoutPage implements OnInit{

  pagamento: string;
  retirada: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private funcoes: Funcoes) {
    this.retirada = '';
    this.pagamento = '';
  }

  ionViewDidLoad() {}

  ngOnInit() {}

  selecionarPagamento(pagamento){
    this.pagamento = pagamento;
  }

  selecionarRetirada(retirada){
    this.retirada = retirada;
  }

  pushToEnderecoOuPagamento(){

    sessionStorage.setItem('pagamento', this.pagamento);
    sessionStorage.setItem('retirada', this.retirada);

    if(this.retirada == ''){
      this.funcoes.mostrarAlertDeErro("Erro", "Informe o método de retirada !");
    } else if (this.pagamento == ''){
      this.funcoes.mostrarAlertDeErro("Erro", "Informe o método de pagamento !");
    } else {
      if(this.retirada == "ENTREGA"){
        this.navCtrl.push(EnderecoPage);
      }
    }
  }


}
