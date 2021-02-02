import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {
  @Input('appBorder') width: number;

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click') onClick(): void {
    const width = this.width || 2;
    this.render.setStyle(this.el.nativeElement, 'border', `${width}px solid black`);
  }
}
