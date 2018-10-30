import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[input]' })
export class CardapioItemDescricaoDirective {
    constructor(el: ElementRef) {
       console.log(el.nativeElement.value);
    }
}