import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstabelecimentoService } from './estabelecimento.service';

@Component({
  selector: 'page-estabelecimento',
  templateUrl: 'estabelecimento.html',
})

export class Estabelecimento implements OnInit {

  estabelecimento: Estabelecimento;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private estabelecimentoService: EstabelecimentoService) {
  }

  ngOnInit(): void {

  }

  ionViewWillEnter(): void{
    console.log('teste');
  }
}

