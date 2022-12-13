import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class SelectThemeComponent implements OnInit {
  public theme: string | any;
  @Output() closeValue = new EventEmitter<boolean>();
  @Output() currentTheme = new EventEmitter<string>();

  public ngOnInit(): void {
    // Get if there is a theme or not
    const checkTheme = async () => {
      const { value } = await Preferences.get({ key: 'theme' });
      this.theme = value;
    }; checkTheme();
  }

  // Select a theme and add to localstorage or not
  public selectTheme(option: string): void {
    if (option == 'light') {
      document.body.classList.remove('dark-theme');
    }
    else if (option == 'dark') {
      document.body.classList.add('dark-theme');
    }
    else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }

    // Set theme in locastorage
    const setTheme = async () => {
      await Preferences.set({
        key: 'theme',
        value: option,
      });
    }; setTheme();
    this.theme == option;

    // Close popup
    setTimeout(() => {
      this.closeValue.emit(true);
      this.currentTheme.emit(option)
    }, 200);
  }
}
