import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { LogoutComponent } from '../../modals/logout/logout.component';
import { DeleteAccountComponent } from '../../modals/delete-account/delete-account.component';
import { ProfilePictureComponent } from '../../modals/profile-picture/profile-picture.component';

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

  constructor(private formBuilder: UntypedFormBuilder,
    private getUserService: GetUserService,
    private modalController: ModalController)
  { }

  public ngOnInit(): void {
    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      } else {
        this.getUserService.getToken(); // A retirer après avoir mis en place le login
      }
    }; getUser()

    // Create form
    this.form = this.formBuilder.group({
      profilePictureUrl: [],
      full_name: [],
      email: []
    })
  }

  // Called when page view is loaded
  public ionViewDidEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      } else {
        this.getUserService.getToken(); // A retirer après avoir mis en place le login
      }
    }; getUser()
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
    const modalLogout = await this.modalController.create({
      component: LogoutComponent,
      cssClass: 'auto-height'
    });

    const modalDeleteAccount = await this.modalController.create({
      component: DeleteAccountComponent,
      cssClass: 'auto-height'
    });

    const modalProfilePicture = await this.modalController.create({
      component: ProfilePictureComponent,
      cssClass: 'auto-height'
    });

    if (type == 'logout') {
      modalLogout.present();
    } else if (type == 'delete-account') {
      modalDeleteAccount.present()
    } else if (type == 'edit-pdp') {
      modalProfilePicture.present()
    }
  }
}
