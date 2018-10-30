import { CardapioItem } from './cardapio-item';
import { Estabelecimento } from './../estabelecimento/estabelecimento';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardapioItemService {

  constructor(private http: Http) { }

  //private headers = new Headers({ 'Content-Type': 'application/json' });
  private headers = new Headers();
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/cardapioItem/';


  getPorId(id: string): Promise<CardapioItem[]> {

    let params = {
      id: id
    }

    let url: string = this.urlServidor + 'busca_cardapio_itens.php';

    return this.http.post(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as CardapioItem[])
      .catch(this.handleError);

  }

  public create(item, opcionais): Promise<any> {

    let url: string = this.urlServidor + 'adiciona_cardapio_item.php';

    return this.http
      .post(url, JSON.stringify({ item: item, opcionais: opcionais }), { headers: this.headers })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
