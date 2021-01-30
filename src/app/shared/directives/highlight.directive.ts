import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() { }

  @HostBinding('class') class;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.class = 'highlight';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.class = '';
  }
}
