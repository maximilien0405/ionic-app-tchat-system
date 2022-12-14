import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class SelectLanguageComponent implements OnInit {
  public lang: string | any;
  @Output() closeValue = new EventEmitter<boolean>();
  @Output() currentLang = new EventEmitter<string>();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Get if there is a theme or not
    const checkTheme = async () => {
      const { value } = await Preferences.get({ key: 'lang' });
      this.lang = value;
    }; checkTheme();
  }

  // Select a lang and add to localstorage or not
  public selectLang(option: string): void {
    const setTheme = async () => {
      await Preferences.set({
        key: 'lang',
        value: option,
      });
    }; setTheme();

    this.lang = option;
    this.translate.use(option);
    this.translate.setDefaultLang(option);
    this.currentLang.emit(option)

    // Close popup
    setTimeout(() => {
      this.closeValue.emit(true);
    }, 200);
  }
}
