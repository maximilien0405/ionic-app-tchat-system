import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user.model';
import { SelectThemeComponent } from '../../modals/select-theme/select-theme.component';
import { SelectLanguageComponent } from '../../modals/select-language/select-language.component';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  public currentTheme: string | any;
  public currentLang: string | any;
  public user: User;

  constructor(private modalController: ModalController) {}

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

    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()
  }

  public setNewTheme(event: string): void {
    this.currentTheme = event;
  }

  public setNewLang(event: string): void {
    this.currentLang = event;
  }

  // Open modals and get back data
  public async openModal(type: string) {
    const modalTheme = await this.modalController.create({
      component: SelectThemeComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height'
    });

    const modalLang = await this.modalController.create({
      component: SelectLanguageComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height'
    });

    const modalProfile = await this.modalController.create({
      component: ProfileComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });

    modalLang.onDidDismiss().then((data) => {
      if (data['data']) {
        this.currentLang = data['data'];
      }
    });

    modalTheme.onDidDismiss().then((data) => {
      if (data['data']) {
        this.currentTheme = data['data'];
      }
    });

    modalProfile.onDidDismiss().then((data) => {
      if (data['data']) {
        const getUser = async () => {
          const { value } = await Preferences.get({ key: 'user' });
          if(value) {
            this.user = JSON.parse(value || '')
          }
        }; getUser()
      }
    });


    if (type == 'theme') {
      modalTheme.present();
    } else if (type == 'lang') {
      modalLang.present()
    } else if (type == 'profile') {
      modalProfile.present();
    }
  }
}
