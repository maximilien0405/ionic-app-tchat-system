import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/common/models/user.model';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { AboutComponent } from '../about/about.component';
import { AccountComponent } from '../account/account.component';
import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  public componentAccount = AccountComponent;
  public componentAbout = AboutComponent;
  public componentHelp = HelpComponent;
  public currentTheme: string | any;
  public currentLang: string | any;
  public doFadeOutAnimation: boolean;
  public user: User;

  @Output() closeValue = new EventEmitter<boolean>();

  constructor(private getUserService: GetUserService) {}

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

  public setNewTheme(event: string): void {
    this.currentTheme = event;
  }

  public setNewLang(event: string): void {
    this.currentLang = event;
  }
}
