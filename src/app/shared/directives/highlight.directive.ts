import { Directive, ElementRef, inject, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly appHighlight = input<string>('yellow');

  constructor() {
    effect(() => {
      this.el.nativeElement.style.backgroundColor = this.appHighlight();
    });
  }
}
