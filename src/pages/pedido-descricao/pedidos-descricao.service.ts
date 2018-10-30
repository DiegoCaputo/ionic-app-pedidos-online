import { CardapioItem } from './../cardapio-item/cardapio-item';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PedidoDescricaoService {

  constructor(private http: Http) { }

  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/pedidoItens/';

  getItens(pedido): Promise<CardapioItem[]> {

    let id = pedido['pk_pedido_id'];

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.urlServidor + 'buscar_pedido_itens.php',
      JSON.stringify({ id: id }), { headers: headers })
      .toPromise()
      .then(response => response.json() as CardapioItem[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
