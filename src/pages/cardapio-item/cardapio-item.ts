import { Funcoes } from './../../providers/funcoes';
import { CardapioItemDescricao } from './../cardapio-item-descricao/cardapio-item-descricao';
import { CardapioItemService } from './cardapio-item.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-cardapio-item',
  templateUrl: 'cardapio-item.html',
})
export class CardapioItem implements OnInit {

  cardapioItemClass: this;
  cardapioItens: CardapioItem[];
  titulo: string;
  bandeija: Array<any>;
  loader: any;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private cardapioService: CardapioItemService,
    private events: Events,
    private funcoes: Funcoes) {
  }

  getCardapioItens() {
    this.cardapioService
      .getPorId(this.navParams.data.objeto.id)
      .then(cardapioItens => this.cardapioItens = cardapioItens)
      .then(response => this.loader.dismiss());
  }

  filtrar(ev: any): void {

    let val = ev.target.value;
    console.log(val);

    if (val && val.trim() != '') {
      this.cardapioItens = this.cardapioItens.filter((cardapioItem) => {
        return JSON.parse(JSON.stringify(cardapioItem)).item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.getCardapioItens();
    }

  }

  pushPage(objeto: CardapioItem): void {
    this.navCtrl.push(CardapioItemDescricao, {
      objeto: objeto,
      cardapio: this.navParams.data.objeto
    });
  }

  ngOnInit(): void { }

  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading('');

    this.getCardapioItens();
    this.cardapioItemClass = this;
    this.titulo = this.navParams.data.objeto.nome;
    this.bandeija = new Array();
  }

  ionViewDidEnter() {
  }

}
