import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { ProfilePictureComponent } from '../../modals/profile-picture/profile-picture.component';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class AccountComponent implements OnInit {
  public user: User;
  public token: string;
  public form: UntypedFormGroup | any;
  public formError: boolean;
  public imageError: boolean;
  public imageSubmitted: boolean;
  public userId: string;
  public photo: Photo;
  public toastBottom: number; 

  constructor(private formBuilder: UntypedFormBuilder,
    private getUserService: GetUserService,
    private modalController: ModalController,
    private toastController: ToastController,
    private translateService: TranslateService)
  { }

  public ngOnInit(): void {
    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()

    // Create form
    this.form = this.formBuilder.group({
      profilePictureUrl: [],
      full_name: [],
      email: []
    })

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.toastBottom = 0.0625 * (insets.bottom + 48.25 - 9 + 16);
    });
  }

  // Check if name/mail/pwd modified and display toast
  public ionViewDidEnter() {
    const checkNameMailPwd = async () => {
      const { value } = await Preferences.get({ key: 'change-value' });

      if (value) {
        this.displayToast(value || '');
        
        const getUser = async () => {
          const { value } = await Preferences.get({ key: 'user' });
          console.log(value)
          if(value) {
            this.user = JSON.parse(value || '')
          }
        }; getUser()

        await Preferences.remove({ key: 'change-value' })
      }
    }; checkNameMailPwd()
  }

  // Return form controls
  get f() { return this.form.controls; }

  public openImageSelector(): void {
    const getPhoto = async () => {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });

      this.photo = image;

      this.openModal('edit-pdp');
    }; getPhoto();
  }

  // Open modals
  public async openModal(type: string) {
    const modalProfilePicture = await this.modalController.create({
      component: ProfilePictureComponent,
      cssClass: 'auto-height'
    });

    if (type == 'edit-pdp') {
      modalProfilePicture.present()
    }
  }

  // Display a toast with custom message
  public async displayToast(type: string) {
    let message = '';

    switch (type) {
      case 'name':
        message = this.translateService.instant('SENDER.SETTINGS.ACCOUNT.toast_name')
        break;
      case 'mail': 
        message = this.translateService.instant('SENDER.SETTINGS.ACCOUNT.toast_mail')
        break;
      case 'pwd':
        message = this.translateService.instant('SENDER.SETTINGS.ACCOUNT.toast_pwd')
        break;
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'tabs-bottom',
      mode: 'ios',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          handler: () => {},
        },
      ],
    });

    toast.setAttribute('style', 'transform: translateY(-' + this.toastBottom + 'rem) !important;')

    await toast.present();
  }
}