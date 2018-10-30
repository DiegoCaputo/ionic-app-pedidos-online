import { EnderecosService } from './enderecos.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-enderecos',
  templateUrl: 'enderecos.html'
})

export class EnderecosPage implements OnInit {

  @ViewChild(Segment)

  segment: Segment;
  opcao: String;
  pagamento: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.opcao = "cadastro";
    this.pagamento = this.navParams.get('pagamento');
  }

  ionViewDidLoad() {

  }

  ngOnInit() { }

  public setarOpcao(opcao): void {
    this.opcao = opcao;
  }

}
