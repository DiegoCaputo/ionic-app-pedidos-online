import { Comanda } from './../../pages/comanda/comanda';
import { NavController, ViewController } from 'ionic-angular';
import { FinalizarPedido } from './../../pages/finalizar-pedido/finalizar-pedido';
import { Component, Input, ViewChild } from '@angular/core';

//Estabelecimento
import { EstabelecimentoService } from './../../pages/estabelecimento/estabelecimento.service';
import { Estabelecimento } from './../../pages/estabelecimento/estabelecimento';

//Components
import { BandeijaIcon } from './../bandeija-icon/bandeija-icon';

@Component({
  selector: 'custom-header',
  templateUrl: 'header.html'
})
export class Header {

  @Input() titulo: string;
  @Input() objeto: any;
  @Input() filter: boolean;

  estabelecimento: Estabelecimento;
  comanda: any;
  hideBackButton: Boolean;
  mesa: String;
  localizacaoDoUsuario: String;

  constructor(private estabelecimentoService: EstabelecimentoService,
    private navCtrl: NavController,
    private viewCtrl: ViewController) {

    this.mesa = sessionStorage.getItem("mesa");
    this.localizacaoDoUsuario = sessionStorage.getItem("localizacaoDoUsuario");
    this.getEstabelecimento();
    this.comanda = sessionStorage.getItem("comanda");
    this.hideBackButton = false;
    if (this.viewCtrl.name == "cardapio") {
      this.hideBackButton = true;
    }


  }

  getEstabelecimento(): void {
    this.estabelecimentoService
      .getPorId('1-01')
      .then(estabelecimento => this.estabelecimento = estabelecimento);
  }

  filtrar(ev: any): void {
    this.objeto.filtrar(ev);
  }

}
