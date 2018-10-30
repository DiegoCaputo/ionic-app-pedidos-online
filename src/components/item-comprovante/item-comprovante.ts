import { ViewController } from 'ionic-angular';
import { CardapioItem } from './../../pages/cardapio-item/cardapio-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-comprovante',
  templateUrl: 'item-comprovante.html'
})
export class ItemComprovanteComponent implements OnInit {

  text: string;
  @Input() itens: CardapioItem[];
  total: any = '0.0';

  constructor(private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.total = this.getTotal();
  }

  getTotal() {

    let total: any = '0.0';

    for (var i = 0; i < this.itens.length; i++) {
      total = parseFloat(total) + parseFloat(this.itens[i][0].valorTotal);
    }

    return total;
  }

}
