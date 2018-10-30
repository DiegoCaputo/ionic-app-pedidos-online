import { Cardapio } from './../cardapio/cardapio';
import { Funcoes } from './../../providers/funcoes';
import { FinalizarPedidoService } from './../finalizar-pedido/finalizar-pedido.service';
import { BandeijaService } from './../bandeija/bandeija.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pedido-confirmado',
  templateUrl: 'pedido-confirmado.html',
})
export class PedidoConfirmadoPage implements OnInit {

  endereco: Object;
  bandeija = new Array;
  pagamento: string;
  retirada: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private FinalizarPedidoService: FinalizarPedidoService,
    private funcoes: Funcoes) { }

  ngOnInit() {
    this.endereco = JSON.parse(sessionStorage.getItem('endereco'));
    this.pagamento = sessionStorage.getItem('pagamento');
    this.retirada = sessionStorage.getItem('retirada');
    this.bandeija = JSON.parse(sessionStorage.getItem('bandeija'));
    this.pagamento = this.pagamento.charAt(0) + this.pagamento.substring(1, this.pagamento.length).toLowerCase();
    this.retirada = this.retirada.charAt(0) + this.retirada.substring(1, this.retirada.length).toLowerCase();
  }

  ionViewDidLoad() {

  }

  confirmarPedido() {

    let params = {
      bandeija: this.bandeija,
      localizacaoDoUsuario: sessionStorage.getItem('localizacaoDoUsuario'),
      autenticacao: sessionStorage.getItem('idAutenticacao')
    }

    let funcoes = this.funcoes;

    let botoes = [
      {
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.push(Cardapio);
        }
      }
    ]

    this.FinalizarPedidoService.confirmarPedido(params).then(response => {
      funcoes.mostrarAlertDeConfirmacao('PEDIDO Nº ' + response.pk_pedido_id, 'Obrigado, o pedido foi enviado ao estabelecimento !', botoes);
      sessionStorage.removeItem('bandeija');
      sessionStorage.removeItem('endereco');
      sessionStorage.removeItem('pagamento');
      sessionStorage.removeItem('retirada');
    });
  }

}
