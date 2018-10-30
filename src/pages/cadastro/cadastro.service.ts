import { Cadastro } from './cadastro';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CadastroService {

    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    urlServidor: String = 'http://eatinmall.com.br/garcomVirtual/controller/';

    getEstados(): Promise<any> {

        let url: string = this.urlServidor + 'estado/busca_estados.php';

        return this.http.post(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getCidades(pkEstadoId): Promise<any> {

        let params = {
            id: pkEstadoId
        }

        let url: string = this.urlServidor + 'cidade/busca_cidades.php';

        return this.http.post(url, JSON.stringify(params), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    setPessoa(pessoa): Promise<any> {

        let params = {
            pessoa: pessoa
        }

        let url: string = this.urlServidor + 'pessoa/insere_pessoa.php';

        return this.http.post(url, JSON.stringify(params), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    updatePessoa(pessoa): Promise<any> {

        let params = {
            pessoa: pessoa
        }

        let url: string = this.urlServidor + 'pessoa/altera_pessoa.php';

        return this.http.post(url, JSON.stringify(params), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPessoas(): Promise<any> {

        let url: string = this.urlServidor + 'pessoa/busca_pessoas.php';

        return this.http.post(url, '', { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
