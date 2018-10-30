import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

declare var PagSeguroDirectPayment;

@Injectable()
export class FinalizarPedidoService {

  constructor(private http: Http) {
    this.getSession();
  }

  private headers = new Headers({ 'Access-Control-Allow-Headers': '*' });
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/';


  getSession(): Promise<any> {
    return this.http.get(this.urlServidor + 'pagseguro/buscar_pagamento_session_id.php')
      .toPromise()
      .then(response => PagSeguroDirectPayment.setSessionId(response.json().session_id));
  }

  enviarDadosPagseguro(params): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlServidor + 'pagseguro/enviar_dados_pagseguro.php',
      JSON.stringify(params), options)
      .toPromise()
      .then(response => response.json());
  }

  confirmarPedido(params): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlServidor + 'pedido/insere_pedido.php',
      JSON.stringify(params), options)
      .toPromise()
      .then(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
