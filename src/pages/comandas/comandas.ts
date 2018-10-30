import { Funcoes } from './../../providers/funcoes';
import { ComandaDescricaoPage } from './../comanda-descricao/comanda-descricao';
import { ComandaService } from './../comanda/comanda.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comandas',
  templateUrl: 'comandas.html',
})


export class ComandasPage implements OnInit {

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
    this.comandaService.get()
      .then(response => this.comandas = response)
      .then(_ => this.loader.dismiss());
  }

  pushToComandaDescricao(comanda) {
    this.navCtrl.push(ComandaDescricaoPage, {
      id: comanda.pk_comanda_id
    })
  }

}
