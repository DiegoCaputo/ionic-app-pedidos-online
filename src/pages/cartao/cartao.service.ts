import { File } from '@ionic-native/file';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CartaoService {

    constructor(private file: File) {
        //this.file.removeFile(this.file.dataDirectory+'Cartoes','cartoes');
    }

    salvar(cartao, brandImage): Promise<any> {

        let numero = "**** **** **** " +  cartao.cardNumber.substring(cartao.cardNumber.length - 4);
        let dadosCartaoArquivo: string;
        let dadosCartao: string =  cartao.cardNumber + '!@' + numero + '!@' + brandImage + '!@' + cartao.cvv + '!@' + cartao.expirationMonth + '!@' + cartao.expirationYear;

        this.file.checkDir(this.file.dataDirectory, 'Cartoes').then(_ => '').catch(err => this.file.createDir(this.file.dataDirectory, 'Cartoes', false).catch(this.handleError));
        this.file.createFile(this.file.dataDirectory + 'Cartoes', 'cartoes', true);
        return this.file.readAsText(this.file.dataDirectory + 'Cartoes', 'cartoes')
            .then(response => {
                dadosCartaoArquivo = response

                if (dadosCartaoArquivo !== '') {
                    dadosCartaoArquivo = dadosCartaoArquivo + '|' + dadosCartao;
                } else {
                    dadosCartaoArquivo = dadosCartao;
                }

                this.escrever(dadosCartaoArquivo);
            });
    }

    escrever(dadosArquivo): Promise<any> {
        return this.file.writeFile(this.file.dataDirectory + 'Cartoes', 'cartoes', dadosArquivo, { replace: true })
            .then(response => response)
            .catch(this.handleError);
    }

    listar(): Promise<any> {
        return this.file.readAsText(this.file.dataDirectory + 'Cartoes', 'cartoes')
            .then(response => response.split('|'));
    }

    remover(cartao): Promise<any> {

        let cartoes: Array<any> = new Array;
        let texto: String = '';

        return this.listar().then(response => {
            cartoes = response

            cartoes.forEach(function (element, index) {

                let numero: String = element.split('!@')[1];

                if (numero.substring(numero.length - 4) !== cartao.numero.substring(cartao.numero.length - 4)) {
                    texto += cartao.numero + '!@' + numero + '!@' + element.split('!@')[2] + '!@' + element.split('!@')[3] + '!@' + element.split('!@')[4] + '!@' + element.split('!@')[5];
                    texto += '|';
                }
            });
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        alert('erro' + JSON.stringify(error.message));
        return Promise.reject(error.message || error);
    }

}
