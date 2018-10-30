import { Funcoes } from './../../providers/funcoes';
import { ComandaDescricaoPage } from './../comanda-descricao/comanda-descricao';
import { ComandaService } from './../comanda/comanda.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-comandas-em-aberto',
  templateUrl: 'comandas-em-aberto.html',
})
export class ComandasEmAbertoPage implements OnInit {

  comandas: any;
  loader: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private comandaService: ComandaService,
    private funcoes: Funcoes) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading("");
    this.comandaService.getEmAberto()
      .then(response => this.comandas = response)
      .then(_ => this.loader.dismiss());
  }

  pushToComandaDescricao(comanda) {
    this.navCtrl.push(ComandaDescricaoPage, {
      id: comanda.pk_comanda_id
    })
  }

}
