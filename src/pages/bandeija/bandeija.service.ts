import { Cardapio } from './../cardapio/cardapio';
import { CardapioItem } from './../cardapio-item/cardapio-item';
import { Injectable, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BandeijaService {

  constructor(private http: Http) { }

  private headers = new Headers();
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/pedido/';

  create(endereco = null): Promise<any> {


    let params = {
      bandeija: JSON.parse(sessionStorage.getItem('bandeija')),
      autenticacao: sessionStorage.getItem('idAutenticacao')
    }

    let url: string = this.urlServidor + 'insere_pedido.php';

    return this.http.post(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(function (data) {

        let comandaArray = new Array;
        let bandeijaArray = new Array;

        if (sessionStorage.getItem('comanda') !== null) {
          comandaArray = JSON.parse(sessionStorage.getItem('comanda'));
          bandeijaArray = JSON.parse(sessionStorage.getItem('bandeija'));

          for (var i = 0; i < bandeijaArray.length; i++) {
            comandaArray.push(bandeijaArray[i]);
          }

          sessionStorage.setItem('comanda', JSON.stringify(comandaArray));
          sessionStorage.setItem('comanda', sessionStorage.getItem('comanda'));
        } else {
          sessionStorage.setItem('comanda', sessionStorage.getItem('bandeija'))
        }

        sessionStorage.removeItem('bandeija');

      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
