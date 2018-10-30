import { Injectable } from '@angular/core';
import { Estabelecimento } from './estabelecimento';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EstabelecimentoService {

  constructor(private http: Http) { }

  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/estabelecimento/';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getPorId(id: string): Promise<Estabelecimento> {

    let url = this.urlServidor + 'busca_estabelecimento.php';

    let params = {
      id: id
    }

    return this.http.post(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Estabelecimento)
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
