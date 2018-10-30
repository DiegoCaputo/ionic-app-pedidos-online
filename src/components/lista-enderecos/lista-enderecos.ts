import { NavController } from 'ionic-angular/navigation/nav-controller';
import { EnderecosService } from './../../pages/enderecos/enderecos.service';
import { Component, Input } from '@angular/core';
import { Funcoes } from '../../providers/funcoes';
import { PedidoConfirmadoPage } from '../../pages/pedido-confirmado/pedido-confirmado';

@Component({
  selector: 'lista-enderecos',
  templateUrl: 'lista-enderecos.html'
})
export class ListaEnderecosComponent {

  enderecos: any;

  @Input() pagamento: boolean;

  constructor(private enderecosService: EnderecosService,
    private funcoes: Funcoes,
    private navCtrl: NavController) {
    this.listar();
  }

  listar() {
    this.enderecosService.listar().then(enderecos => this.enderecos = enderecos);
  }


  remover(endereco) {

  }

  mostrarConfirmacaoRemocaoDeEndereco(endereco) {

    let botoes = [
      {
        text: 'Sim',
        role: 'sim',
        handler: () => {
          this.remover(endereco);
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
    let mensagem = "Deseja excluir o endereço ?"

    this.funcoes.mostrarAlertDeConfirmacao(titulo, mensagem, botoes);
  }


  pushToPedidoConfirmado(endereco) {

    sessionStorage.setItem('endereco', JSON.stringify(endereco));

    this.navCtrl.push(PedidoConfirmadoPage, {
      endereco: endereco
    })
  }

}
