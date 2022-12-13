import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideRightAnimation } from 'src/app/common/animations';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation, slideRightAnimation]
})
export class HelpComponent implements OnInit {
  public paddingTop: Number;
  public close: boolean;
  public select1: boolean;
  public select2: boolean;
  public select3: boolean;
  public select4: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.paddingTop = 0.0625 * (insets.top + 5);
    });
  }

  ngOnInit(): void {}

  // Close the page
  public closePage(): void {
    this.close = true;
    setTimeout(() => {
      this.closeValue.emit(true);
    }, 250);
  }

  // Open the select dropdown
  public openSelect(id: number): void {
    switch (id) {
      case 1:
        this.select1 = !this.select1;
        break;
      case 2:
        this.select2 = !this.select2;
        break;
      case 3:
        this.select3 = !this.select3;
        break;
      case 4:
        this.select4 = !this.select4;
        break;
    }
  }
}
