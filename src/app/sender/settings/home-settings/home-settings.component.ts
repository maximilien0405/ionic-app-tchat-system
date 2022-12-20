import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { User } from 'src/app/common/models/user.model';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { SelectThemeComponent } from '../../modals/select-theme/select-theme.component';
import { SelectLanguageComponent } from '../../modals/select-language/select-language.component';
import { DeleteAccountComponent } from '../../modals/delete-account/delete-account.component';
import { LogoutComponent } from '../../modals/logout/logout.component';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class HomeSettingsComponent implements OnInit {
  public currentTheme: string | any;
  public currentLang: string | any;
  public user: User;

  constructor(private getUserService: GetUserService,
    private modalController: ModalController)
  { }

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

  // Open modals and get back data
  public async openModal(type: string) {
    const modalTheme = await this.modalController.create({
      component: SelectThemeComponent,
      cssClass: 'auto-height'
    });

    const modalLang = await this.modalController.create({
      component: SelectLanguageComponent,
      cssClass: 'auto-height'
    });

    const modalLogout = await this.modalController.create({
      component: LogoutComponent,
      cssClass: 'auto-height'
    });

    const modalDeleteAccount = await this.modalController.create({
      component: DeleteAccountComponent,
      cssClass: 'auto-height'
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
      modalDeleteAccount.present()
    }
  }
}
