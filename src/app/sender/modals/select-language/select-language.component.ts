import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class SelectLanguageComponent implements OnInit {
  public lang: string | any;

  constructor(private translate: TranslateService, private modalController: ModalController) {}

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

    // Close popup
    setTimeout(() => {
      this.modalController.dismiss(option);
    }, 200);
  }
}
