// check-value.directive.ts
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPositiveCheck]',
  standalone:true
})
export class PositiveCheck implements OnChanges {
  @Input() appPositiveCheck: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appPositiveCheck']) {
      const value = changes['appPositiveCheck'].currentValue;
      if (value < 0) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      }
    }
  }
}
