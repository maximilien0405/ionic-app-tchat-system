import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user.model';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { SelectThemeComponent } from '../../modals/select-theme/select-theme.component';
import { SelectLanguageComponent } from '../../modals/select-language/select-language.component';
import { DeleteAccountComponent } from '../../modals/delete-account/delete-account.component';
import { LogoutComponent } from '../../modals/logout/logout.component';
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
  public marginTop: number;

  constructor(private modalController: ModalController) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginTop = 0.0625 * ((insets.top || 16) + 16);
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
  }

  // Get user when page change or init
  public ionViewDidEnter() {
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

    const modalLogout = await this.modalController.create({
      component: LogoutComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height'
    });

    const modalDeleteAccount = await this.modalController.create({
      component: DeleteAccountComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height'
    });

    const modalProfile = await this.modalController.create({
      component: ProfileComponent,
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

    if (type == 'theme') {
      modalTheme.present();
    } else if (type == 'lang') {
      modalLang.present()
    } else if (type == 'logout') {
      modalLogout.present();
    } else if (type == 'delete-account') {
      modalDeleteAccount.present();
    } else if (type == 'profile') {
      modalProfile.present();
    }
  }
}
