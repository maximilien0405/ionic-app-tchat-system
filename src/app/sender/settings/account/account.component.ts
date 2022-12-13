import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { Output, EventEmitter } from '@angular/core';
import { fadeAnimation, slideRightAnimation, slideUpAnimation } from 'src/app/common/animations';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { UserService } from 'src/app/common/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, of } from 'rxjs';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SettingsComponent } from '../settings.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation, slideRightAnimation, slideUpAnimation]
})
export class AccountComponent implements OnInit {
  public componentSettings = SettingsComponent;

  @Output() closeValue = new EventEmitter<boolean>();
  public paddingTop: number;
  public paddingBottom: number;
  public pagePopup: Boolean;
  public showPageEditName: boolean;
  public showPageEditMail: boolean;
  public showPageEditPwd: boolean;
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

  constructor(private formBuilder: UntypedFormBuilder, private getUserService: GetUserService) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.paddingTop = 0.0625 * (insets.top + 5);
      this.paddingBottom = 0.0625 * (insets.bottom + 62.3);
    });
  }

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

  public closePage(): void {
    this.close = true;
    this.removeAnimation = false;
    setTimeout(() => {
      this.closeValue.emit(true);
    }, 250);
  }

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

  public showPage(name: string): void {
    Haptics.impact({ style: ImpactStyle.Light });

    this.doFadeOutAnimation = true;
    this.removeAnimation = true;

    if (name == 'edit-name') {
      this.showPageEditName = true;
    } else if (name == 'edit-mail') {
      this.showPageEditMail = true;
    } else if (name == 'edit-pwd') {
      this.showPageEditPwd = true;
    }

    setTimeout(() => {
      this.pagePopup = true;
      this.doFadeOutAnimation = false;
    }, 200);
  }

  public closeSubPage(event: boolean): void {
    if(event) {
      this.doFadeInAnimation = true;
      this.pagePopup = false;
      this.showPageEditName = false;
      this.showPageEditMail = false;
      this.showPageEditPwd = false;

      setTimeout(() => {
        this.doFadeInAnimation = false;
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
