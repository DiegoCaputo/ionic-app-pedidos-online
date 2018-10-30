import { LoadingController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Funcoes {

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  mostraLoading(mensagem: string) {
    mensagem = '';
    let loader = this.loadingCtrl.create({
      content: mensagem
    });

    loader.present();
    return loader;
  }

  mostrarAlertDeConfirmacao(titulo: string, mensagem: string, botoes) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensagem,
      buttons: botoes
    });
    alert.present();
    return alert;
  }

  mostrarAlertDeErro(titulo: string, mensagem: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    alert.present();
    return alert;
  }
}
