import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') private isItOpen: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') manageMenuToggle(eventData: Event) {
    // if (!!this.isItOpen) {
    //   this.renderer.setAttribute(this.elementRef.nativeElement, 'class', '');
    //   this.isItOpen = false;
    // } else {
    //   this.renderer.setAttribute(
    //     this.elementRef.nativeElement,
    //     'class',
    //     'open'
    //   );
    //   this.isItOpen = true;
    // }
    this.isItOpen = !this.isItOpen;
  }
}
