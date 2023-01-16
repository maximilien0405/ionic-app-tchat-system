import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/common/models/user.model';
import { DeleteAccountComponent } from '../../modals/delete-account/delete-account.component';
import { LogoutComponent } from '../../modals/logout/logout.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class SecurityComponent implements OnInit {
  public user: User;
  public form: UntypedFormGroup | any;
  public displayToast: boolean;
  public toastMessage: string;

  constructor(
    private modalController: ModalController, 
    private translateService: TranslateService) 
  { }

  ngOnInit() {
    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()
  }

  // Open modals and get back data
  public async openModal(type: string) {
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

    if (type == 'logout') {
      modalLogout.present();
    } else if (type == 'delete-account') {
      modalDeleteAccount.present();
    }
  }


  // Check if name/mail/pwd modified and display toast
  public ionViewDidEnter() {
    const checkNameMailPwd = async () => {
      const { value } = await Preferences.get({ key: 'change-value' });

      if (value) {
        this.showToast(value || '');

        const getUser = async () => {
          const { value } = await Preferences.get({ key: 'user' });
          if(value) {
            this.user = JSON.parse(value || '')
          }
        }; getUser()

        await Preferences.remove({ key: 'change-value' })
      }
    }; checkNameMailPwd()
  }

  // Display a toast with custom message
  public async showToast(type: string) {
    this.displayToast = true;

    switch (type) {
      case 'mail':
        this.toastMessage = this.translateService.instant('SENDER.SETTINGS.PROFILE.toast_mail')
        break;
      case 'pwd':
        this.toastMessage = this.translateService.instant('SENDER.SETTINGS.PROFILE.toast_pwd')
        break;
    }

    setTimeout(() => {
      this.displayToast = false;
    }, 3000);
  }
}
