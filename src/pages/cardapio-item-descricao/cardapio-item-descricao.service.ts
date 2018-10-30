import { CardapioItem } from './../cardapio-item/cardapio-item';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardapioItemDescricaoService {

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/cardapioItem/';

  getMetades(idItem: Number, idCardapio: Number): Promise<CardapioItem[]> {

    let params = {
      idCardapio: idCardapio,
      idItem: idItem
    }

    let url: string = this.urlServidor + 'busca_cardapio_itens_metades.php';

    return this.http.post(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as CardapioItem[])
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
