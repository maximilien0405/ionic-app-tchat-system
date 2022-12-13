import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { User } from 'src/app/common/models/user.model';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  public componentAccount = AccountComponent;

  public marginTop: Number;
  public paddingBottom: number;
  public pagePopup: Boolean;
  public showPageAccount: boolean;
  public showPageAbout: boolean;
  public showPageHelp: boolean;
  public displayModal: boolean;
  public modalTheme: boolean;
  public modalLanguage: boolean;
  public currentTheme: string | any;
  public currentLang: string | any;
  public doFadeOutAnimation: boolean;
  public user: User;

  @Output() closeValue = new EventEmitter<boolean>();

  constructor(private getUserService: GetUserService) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginTop = 0.0625 * ((insets.top + 20) - 25);
      this.paddingBottom = 0.0625 * (insets.bottom + 62.3);
    });
  }

  ngOnInit(): void {
    // Get current theme
    const checkTheme = async () => {
      const { value } = await Preferences.get({ key: 'theme' });
      if (value) {
        this.currentTheme = value;
      }
    }; checkTheme()

    // Get current lang
    const checkLang = async () => {
      const { value } = await Preferences.get({ key: 'lang' });
      if (value) {
        this.currentLang = value;
      }
    }; checkLang()

    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      } else {
        this.getUserService.getToken(); // A retirer après avoir mis en place le login
      }
    }; getUser()
  }

  public showPage(name: string): void {
    Haptics.impact({ style: ImpactStyle.Light });

    if (name == 'account') {
      this.showPageAccount = true;
    } else if (name == 'about') {
      this.showPageAbout = true;
    } else if (name == 'help') {
      this.showPageHelp = true;
    }

    setTimeout(() => {
      this.pagePopup = true;
    }, 200);
  }

  public close(event: boolean): void {
    if (event) {
      this.pagePopup = false;
      this.showPageAccount = false;
      this.showPageAbout = false;
      this.showPageHelp = false;
    }
  }

  public openModal(name: string) {
    Haptics.impact({ style: ImpactStyle.Light });

    if (name == 'theme') {
      this.modalTheme = true;
    } else if (name == 'language') {
      this.modalLanguage = true;
    }
  }

  public closeModalChoice(event: boolean): void {
    if (event) {
      this.doFadeOutAnimation = true;
      setTimeout(() => {
        this.modalTheme = false;
        this.modalLanguage = false;
      }, 200);
      setTimeout(() => {
        this.doFadeOutAnimation = false;
      }, 200);
    }
  }

  public setNewTheme(event: string): void {
    this.currentTheme = event;
  }

  public setNewLang(event: string): void {
    this.currentLang = event;
  }
}
