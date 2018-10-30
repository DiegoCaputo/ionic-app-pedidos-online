import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PedidosService {

  constructor(private http: Http) {}

  private headers = new Headers({ 'Access-Control-Allow-Headers': '*' });
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/pedido/';

  get(): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlServidor + 'buscar_pedidos.php',
      '', options)
      .toPromise()
      .then(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
