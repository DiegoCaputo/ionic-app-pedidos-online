import { CardapioItemDescricaoService } from './cardapio-item-descricao.service';
import { Funcoes } from './../../providers/funcoes';
import { CardapioService } from './../cardapio/cardapio.service';
import { Bandeija } from './../bandeija/bandeija';
import { CardapioItemService } from './../cardapio-item/cardapio-item.service';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cardapio-item-descricao',
  templateUrl: 'cardapio-item-descricao.html',
})
export class CardapioItemDescricao implements OnInit {

  //ngModel
  quantidade: string;
  observacao: string;

  titulo: string;
  item: CardapioItem;
  opcionais: Array<any>;
  opcoes: Array<any>;
  opcoesSelecionadas: Array<any>;
  valor: any;
  itemOpcionais: Array<any>;
  array: Array<any>;
  bandeija: Array<any>;
  cardapioItensOpcoes: any;
  alterar: boolean;
  loader: any;
  meio_a_meio: Number;
  meio: Number;
  cardapioId: any;
  itens: CardapioItem[];
  cardapio: any;
  valorOriginal: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardapioItemService: CardapioItemService,
    private cardapioService: CardapioService,
    private funcoes: Funcoes,
    private cardapioItemDescricaoService: CardapioItemDescricaoService,
  ) {
  }

  selecionarOpcional(opcional): void {

    let existe: boolean = false;
    let idItemOpcao: number;
    let idOpcao: number;
    let idx: number;
    let bandeija = new Array;
    let array = new Array;

    bandeija = JSON.parse(sessionStorage.getItem("bandeija"));

    this.opcionais.find(element => existe = element.id == opcional.id);

    if (!existe) {
      this.opcionais.push(opcional);
      this.valor = (parseFloat(this.valor) + parseFloat(opcional.preco));

      for (var i = 0; i < this.opcoes.length; i++) {
        for (var y = 0; y < this.opcoes[i].length; y++) {
          if (this.opcoes[i][y].id == opcional.id) {
            this.opcoes[i][y].selecionado = 1;
          }
        }
      }

    } else {

      this.opcionais.forEach(function (element, index) {
        if (element.id == opcional.id) {
          idx = index;
        }
      });

      for (var i = 0; i < this.opcoes.length; i++) {
        for (var y = 0; y < this.opcoes[i].length; y++) {
          if (this.opcoes[i][y].id == opcional.id) {
            this.opcoes[i][y].selecionado = 0;
          }
        }
      }

      this.opcionais.splice(idx, 1);

      this.valor = (parseFloat(this.valor) - parseFloat(opcional.preco));
      opcional['selecionado'] = 0;
    }

  }

  adicionarProduto(): void {

    let valorTotal;

    if (this.item['metade'] == '') {
      valorTotal = this.item['preco'];
    } else {
      if (this.item['preco'] > this.item['precoMetade']) {
        valorTotal = this.item['preco'];
      } else {
        valorTotal = this.item['precoMetade'];
      }
    }

    for (var i = 0; i < this.opcionais.length; i++) {
      valorTotal = parseFloat(valorTotal) + parseFloat(this.opcionais[i]['preco']);
    }

    this.item['valorTotal'] = parseFloat(valorTotal) * parseFloat(this.quantidade);
    this.item['quantidade'] = this.quantidade;
    this.item['observacao'] = this.observacao;
    this.itemOpcionais.push(this.item);
    this.itemOpcionais.push(this.opcionais);
    this.itemOpcionais.push(this.opcoes);

    if (sessionStorage.getItem('bandeija') != null) {
      this.array = JSON.parse(sessionStorage.getItem('bandeija'));
    }

    this.array.push(this.itemOpcionais);

    sessionStorage.setItem('bandeija', JSON.stringify(this.array));

    this.bandeija = JSON.parse(sessionStorage.getItem('bandeija'));

    this.navCtrl.setRoot(Bandeija, {
      objeto: this.bandeija,
      reload: true,
      cardapio: this.cardapio
    });

  }

  atualizarProduto(item): void {

    this.array = JSON.parse(sessionStorage.getItem('bandeija'));

    let valorTotal;

    if (this.item['metade'] == '') {
      valorTotal = this.item['preco'];
    } else {
      if (this.item['preco'] > this.item['precoMetade']) {
        valorTotal = this.item['preco'];
      } else {
        valorTotal = this.item['precoMetade'];
      }
    }

    let idx: number = this.navParams.data.index;

    for (var i = 0; i < this.opcionais.length; i++) {
      valorTotal = parseFloat(valorTotal) + parseFloat(this.opcionais[i]['preco']);
    }

    this.item['valorTotal'] = parseFloat(valorTotal) * parseFloat(this.quantidade);
    this.item['quantidade'] = this.quantidade;
    this.item['observacao'] = this.observacao;

    this.array[idx].splice(0, 1, this.item);
    this.array[idx].splice(1, 1, this.opcionais);
    this.array[idx].splice(2, 1, this.opcoes);

    sessionStorage.setItem('bandeija', JSON.stringify(this.array));
    this.bandeija = JSON.parse(sessionStorage.getItem('bandeija'));

    this.navCtrl.setRoot(Bandeija, {
      objeto: this.bandeija,
      reload: true,
      cardapio: this.cardapio
    });

  }

  ngOnInit(): void { }


  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading('');


    this.opcionais = new Array;
    this.opcoes = new Array;
    this.opcoesSelecionadas = new Array;
    this.itemOpcionais = new Array;
    this.array = new Array;
    this.bandeija = new Array;
    let opc = new Array;

    opc = this.navParams.data.objeto.opcoes;

    this.titulo = this.navParams.data.objeto.item.nome;
    this.item = this.navParams.data.objeto.item;
    this.cardapioId = this.item['cardapioId'];
    this.quantidade = '1';
    this.alterar = this.navParams.data.alterar;

    this.cardapioService.getPorIdCardapio(this.cardapioId)
      .then(response => this.cardapio = response)
      .then(_ => this.meio_a_meio = this.cardapio['meio_a_meio']);

    if (this.item['metade'] == "" || this.item['metade'] == undefined) {
      this.valor = this.item['preco'];
    } else {
      if (this.item['preco'] > this.item['precoMetade']) {
        this.valor = this.item['preco'];
      } else {
        this.valor = this.item['precoMetade'];
      }
    }

    this.opcoes = Object.keys(opc).map(function (key) { return opc[key]; })

    if (this.alterar) {
      this.opcionais = this.navParams.data.objeto.opcoesSelecionadas;
      for (var i = 0; i < this.opcionais.length; i++) {
        this.valor = parseFloat(this.valor) + parseFloat(this.opcionais[i]['preco']);
      }
      this.quantidade = this.navParams.data.objeto.item.quantidade;
      this.observacao = this.navParams.data.objeto.item.observacao;
    } else {
      this.item['metade'] = '';
    }


    this.valorOriginal = this.valor;

    this.cardapioItemDescricaoService.getMetades(this.item['id'], this.cardapioId)
      .then(response => this.itens = response)
  }

  ionViewDidEnter() {
    this.loader.dismiss();
  }

  selecionarMetade(item) {

    let existe: Boolean;
    let opcionaisSelecionados: Array<any> = new Array();

    if (this.item['metade'] !== '' && this.item['metade'] == item.item['id']) {
      this.valor = this.valorOriginal;
    } else {
      this.item['metade'] = item.item['id'];
      this.item['nomeMetade'] = item.item['nome'];
      this.item['precoMetade'] = item.item['preco'];

      if (this.item['preco'] < item.item['preco']) {
        this.valor = (parseFloat(this.valorOriginal) - parseFloat(this.item['preco'])) + parseFloat(item.item['preco']);
      } else {
        this.valor = this.valorOriginal;
      }
    }

    opcionaisSelecionados.push(this.opcionais.find(element => existe = element.selecionado == 1));

    if (existe) {
      for (var i = 0; i < opcionaisSelecionados.length; i++) {
        this.valor = parseFloat(this.valor) + parseFloat(opcionaisSelecionados[i].preco);
      }
    }

  }
}