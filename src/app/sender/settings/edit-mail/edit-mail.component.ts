import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideRightAnimation, slideUpAnimation } from 'src/app/common/animations';

@Component({
  selector: 'app-edit-mail',
  templateUrl: './edit-mail.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation, slideRightAnimation, slideUpAnimation]
})
export class EditMailComponent implements OnInit {
  public close: boolean;
  public paddingTop: number;
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
