import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: 'not-found.html'
})
export class NotFoundComponent {

  text: string;

  constructor() {
    this.text = 'A PESQUISA NÃO RETORNOU NENHUM RESULTADO !';
  }

}
