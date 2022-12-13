import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device } from '@capacitor/device';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public theme: string | any;

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    window.screen.orientation.lock('portrait');

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true });

    // Set status bar text dark
    const setStatusBarStyleDark = async () => {
      await StatusBar.setStyle({ style: Style.Dark });
    }; setStatusBarStyleDark();

    // Check if phone is in dark theme
    const checkTheme = async () => {
      const { value } = await Preferences.get({ key: 'theme' });
      this.theme = value;

      if (!value) {
        const setTheme = async () => {
          await Preferences.set({
            key: 'theme',
            value: 'auto',
          });
        }; setTheme();
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.classList.add('dark-theme');
        }
      }
      else {
        if (this.theme == 'dark') {
          document.body.classList.add('dark-theme');
        }
        else if (this.theme == 'auto') {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
          }
        }
      }
    }; checkTheme();

    // Set all languages
    this.translate.addLangs(["fr", "en", "it", "de", "es", "pt"]);

    // Get lang from localstorage
    const getLang = async () => {
      const { value } = await Preferences.get({ key: 'lang' });
      if (value) {
        this.translate.setDefaultLang(value);
      } 
      else {
        // If not in localstorage, get language from device
        const getLanguageCode = async () => {
          const lang = await Device.getLanguageCode();
  
          if (this.translate.langs.includes(lang.value)) {
          } else {
            lang.value = 'en';
          }

          const setLang = async () => {
            await Preferences.set({
              key: 'lang',
              value: lang.value,
            });
          }; setLang();

          this.translate.setDefaultLang(lang.value);
          this.translate.use(lang.value);
        }; getLanguageCode();
      }
    }; getLang()
  }
}