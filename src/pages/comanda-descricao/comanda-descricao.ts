import { ComprovantePage } from './../comprovante/comprovante';
import { Funcoes } from './../../providers/funcoes';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { ComandaService } from './../comanda/comanda.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comanda-descricao',
  templateUrl: 'comanda-descricao.html',
})
export class ComandaDescricaoPage implements OnInit {

  numeroComanda: number;
  itens: CardapioItem[];
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
    this.buscarComanda();
  }

  buscarComanda() {
    let id = this.navParams.get('id');
    this.numeroComanda = id;
    this.comandaService.getById(id)
      .then(response => this.itens = response)
      .then(_ => this.loader.dismiss());
  }

  pushToComprovante(itens) {
    this.navCtrl.push(ComprovantePage, {
      itens: itens
    })
  }

}
