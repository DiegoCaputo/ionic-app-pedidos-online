import { Injectable } from '@angular/core';
import { Cardapio } from './cardapio';
import { Http, Headers, JsonpModule } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardapioService {

  urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/cardapio/';

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getPorId(id: string): Promise<Cardapio[]> {

    let params = {
      id: id
    }

    let url: string = this.urlServidor + 'busca_cardapios.php';

    return this.http.post(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Cardapio[])
      .catch(this.handleError);

  }

  getPorIdCardapio(id: string): Promise<Cardapio> {

    let params = {
      id: id
    }

    let url: string = this.urlServidor + 'buscar_cardapio_por_id.php';

    return this.http.post(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Cardapio)
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
