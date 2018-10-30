import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EnderecosService {

  constructor(private http: Http) {}

  private headers = new Headers({ 'Access-Control-Allow-Headers': '*' });
  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/endereco/';

  listar(): Promise<any> {

    return this.http.get(this.urlServidor + 'listar.php','')
      .toPromise()
      .then(response => response.json());
  }

  buscarPorId(id): Promise<any> {

    let params = {id: id}

    return this.http.get(this.urlServidor + 'buscar.php',JSON.stringify(params))
      .toPromise()
      .then(response => response.json());
  }

  inserir(endereco): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let params = {endereco: endereco}

    return this.http.post(this.urlServidor + 'inserir.php',
      JSON.stringify(params), options)
      .toPromise()
      .then(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
