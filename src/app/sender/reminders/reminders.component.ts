import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation } from 'src/app/common/animations';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [fadeAnimation]
})
export class RemindersComponent implements OnInit {
  public paddingTop: Number;

  constructor() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.paddingTop = 0.0625 * (insets.top + 5);
    });
  }

  ngOnInit(): void {}
}
