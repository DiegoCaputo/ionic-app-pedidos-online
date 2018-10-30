import { Funcoes } from './../../providers/funcoes';
import { EstabelecimentoService } from './../estabelecimento/estabelecimento.service';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardapioService } from './cardapio.service';
import { HomePage } from './../home/home';
import { Estabelecimento } from './../estabelecimento/estabelecimento';

@Component({
  selector: 'page-Cardapio',
  templateUrl: 'cardapio.html'
})

export class Cardapio implements OnInit {

  cardapioClass: this;
  cardapios: Cardapio[];
  estabelecimento: Estabelecimento;
  loader: any;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private cardapioService: CardapioService,
    private estabelecimentoService: EstabelecimentoService,
    private funcoes: Funcoes) {
      //sessionStorage.removeItem('bandeija');
      //sessionStorage.removeItem('comanda');
  }

  getCardapios(): void {

    this.cardapioService
      .getPorId(sessionStorage.getItem('idAutenticacao'))
      .then(cardapios => this.cardapios = cardapios)
      .then(response => this.loader.dismiss());
  }

  getEstabelecimento(): void {
    this.estabelecimentoService
      .getPorId(sessionStorage.getItem('idAutenticacao'))
      .then(estabelecimento => this.estabelecimento = estabelecimento);
  }

  filtrar(ev: any): void {

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.cardapios = this.cardapios.filter((cardapio) => {
        return JSON.parse(JSON.stringify(cardapio)).nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.getCardapios();
    }

  }

  pushPage(objeto: Cardapio): void {
    this.navCtrl.push(CardapioItem, {
      objeto: objeto
    });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading('');

    this.getCardapios();
    this.getEstabelecimento();
    this.cardapioClass = this;
  }

}

