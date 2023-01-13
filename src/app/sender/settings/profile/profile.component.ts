import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { ProfilePictureComponent } from '../../modals/profile-picture/profile-picture.component';
import { TranslateService } from '@ngx-translate/core';
import { slideUpAnimation } from 'src/app/common/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [slideUpAnimation]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public token: string;
  public form: UntypedFormGroup | any;
  public formError: boolean;
  public imageError: boolean;
  public imageSubmitted: boolean;
  public userId: string;
  public photo: Photo;
  public displayToast: boolean;
  public toastMessage: string;
  public name: string;

  constructor(private formBuilder: UntypedFormBuilder,
    private modalController: ModalController,
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
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height'
    });

    if (type == 'edit-pdp') {
      modalProfilePicture.present()
    }
  }

  // Display a toast with custom message
  public async showToast(type: string) {
    this.displayToast = true;

    switch (type) {
      case 'name':
        this.toastMessage = this.translateService.instant('SENDER.SETTINGS.PROFILE.toast_name')
        break;
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

  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
  public confirm() {
    return this.modalController.dismiss(this.name, 'confirm');
  }
}
