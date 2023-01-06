import { AfterContentInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appAutoFocusDirective]"
})
export class AutoFocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean;
  constructor(private el: ElementRef) { }

  // Function that focus an element after a time
  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 100);
  }
}
