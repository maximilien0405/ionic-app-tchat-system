import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SettingsComponent } from '../settings.component';
import { EditNameComponent } from '../edit-name/edit-name.component';
import { EditMailComponent } from '../edit-mail/edit-mail.component';
import { EditPwdComponent } from '../edit-pwd/edit-pwd.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class AccountComponent implements OnInit {
  public componentSettings = SettingsComponent;
  public componentEditName = EditNameComponent;
  public componentEditEmail = EditMailComponent;
  public componentEditPwd = EditPwdComponent;

  @Output() closeValue = new EventEmitter<boolean>();
  public close: boolean;
  public user: User;
  public token: string;
  public form: UntypedFormGroup | any;
  public formError: boolean;
  public imageError: boolean;
  public imageSubmitted: boolean;
  public userId: string;
  public modalDeleteAccount: boolean;
  public modalLogout: boolean;
  public modalEditProfilePicture: boolean;
  public removeAnimation: boolean;
  public doFadeOutAnimation: boolean;
  public doFadeOutAnimation2: boolean;
  public doFadeInAnimation: boolean;
  public photo: Photo;

  constructor(private formBuilder: UntypedFormBuilder, private getUserService: GetUserService) {}

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

  // Return form controls
  get f() { return this.form.controls; }

  public openModal(name: string) {
    Haptics.impact({ style: ImpactStyle.Light });

    if (name == 'delete-account') {
      this.modalDeleteAccount = true;
    } else if (name == 'logout') {
      this.modalLogout = true;
    } else if(name == 'edit-pdp') {
      this.modalEditProfilePicture = true;
    }
  }

  public closeModalChoice(event: boolean): void {
    if (event) {
      this.doFadeOutAnimation2 = true;
      setTimeout(() => {
        this.modalLogout = false;
        this.modalDeleteAccount = false;
        this.modalEditProfilePicture = false;
      }, 200);
      setTimeout(() => {
        this.doFadeOutAnimation2 = false;
      }, 200);
    }
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
}
