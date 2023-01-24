import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { ProfilePictureComponent } from '../../modals/profile-picture/profile-picture.component';
import { TranslateService } from '@ngx-translate/core';
import { slideUpAnimation } from 'src/app/common/animations';
import { UserService } from 'src/app/common/services/user.service';
import { GetUserService } from 'src/app/common/services/get-user.service';

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
  public photo: Photo;

  constructor(private formBuilder: UntypedFormBuilder,
    private modalController: ModalController,
    private userService: UserService,
    private getUserService: GetUserService)
  { }

  public ngOnInit(): void {
    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }

      const user = JSON.parse(value || '')

      // Create form
      this.form = this.formBuilder.group({
        firstname: [user.firstname, [Validators.required]],
        lastname: [user.lastname, [Validators.required]],
        about: [user.about]
      })
    }; getUser()
  }

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

  // Close the popup
  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  // Close the popup and update data
  public confirm() {
    if(this.form.get('firstname')?.value == this.user.firstname && this.form.get('lastname')?.value == this.user.lastname && this.form.get('about')?.value == this.user.about) {
      return;
    } else {
      // Save value to backend
      this.userService.setProfile(this.form.get('firstname')?.value, this.form.get('lastname')?.value, this.form.get('about')?.value)
      .then((res: any) => {
        if (res.status != 200) {
          return;
        }
        else {
          // Get updated user
          this.getUserService.setUser();
          return this.modalController.dismiss(true, 'confirm');
        }
      });
    }
  }
}
