import { CardapioItem } from './../cardapio-item/cardapio-item';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

declare var PagSeguroDirectPayment;

@Injectable()
export class ComandaService {

  constructor(private http: Http) { }

  private headers = new Headers({ 'Access-Control-Allow-Headers': '*' });
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/comanda/';

  fecharComanda(total, status) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let params = {
      autenticacao: sessionStorage.getItem('idAutenticacao'),
      total: total,
      status: status
    }

    return this.http.post(this.urlServidor + 'fechar_comanda.php',
      JSON.stringify(params), options)
      .toPromise()
      .then(response => response.json());
  }

  get(): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlServidor + 'buscar_comandas.php',
      '', options)
      .toPromise()
      .then(response => response.json());
  }

  getById(id): Promise<CardapioItem[]> {

    let params = { id: id }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlServidor + 'buscar_comanda_por_id.php',
      JSON.stringify(params), options)
      .toPromise()
      .then(response => response.json() as CardapioItem[])
  }

  getEmAberto(): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlServidor + 'buscar_comandas_em_aberto.php',
      '', options)
      .toPromise()
      .then(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
