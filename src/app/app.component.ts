import { ComandasEmAbertoPage } from './../pages/comandas-em-aberto/comandas-em-aberto';
import { ComandasPage } from './../pages/comandas/comandas';
import { Pedidos } from './../pages/pedidos/pedidos';
import { Cartao } from './../pages/cartao/cartao';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EnderecosPage } from '../pages/enderecos/enderecos';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;
  subMenuComandas: Boolean;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.subMenuComandas = false;
  }

  pushToCartao(){
    this.navCtrl.push(Cartao);
  }

  pushToEnderecos(){
    this.navCtrl.push(EnderecosPage);
  }

  pushToPedidos(){
    this.navCtrl.push(Pedidos);
  }

  mostrarSubMenuComandas(){
    this.subMenuComandas = !this.subMenuComandas;
  }

  pushToComandasPagas(){
    this.navCtrl.push(ComandasPage).then(_ => this.subMenuComandas = !this.subMenuComandas);
  }

  pushToComandasEmAberto(){
    this.navCtrl.push(ComandasEmAbertoPage).then(_ => this.subMenuComandas = !this.subMenuComandas);
  }
}