import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideRightAnimation } from 'src/app/common/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation, slideRightAnimation]
})
export class AboutComponent implements OnInit {
  public paddingTop: Number;
  public close: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.paddingTop = 0.0625 * (insets.top + 5);
    });
  }

  ngOnInit(): void {}

  public closePage(): void {
    this.close = true;
    setTimeout(() => {
      this.closeValue.emit(true);
    }, 250);
  }
}
