import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { User } from 'src/app/common/models/user.model';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class ForgotPwdComponent implements OnInit {
  public form: FormGroup;
  public spinnerDisplay: boolean;
  public errorCode: boolean;
  public codeLengthError: boolean = true;
  public errorPwd: boolean;
  public term = new Subject<string>();
  public submittedForm: boolean;
  public passwordShow: boolean;
  public passHasLettersAndUppercase: boolean;
  public passHasNumberOrSpecial: boolean;
  public passHasMin8Char: boolean;
  public passInfos: boolean;
  public passwordValue: string;
  public passIsDone: boolean;
  public passSubmited: boolean;
  public passIsRequired: boolean;
  public user: User;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController,
    private getUserService: GetUserService)
  { }

  public async ngOnInit() {
    // Create form
    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
    })

    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()

    // Listen on code value
    this.form.get('code')?.valueChanges.subscribe((code: any) => {
      this.errorCode = false;

      if (code.length == 5) {
        this.codeLengthError = false;
      } else {
        this.codeLengthError = true;
      }
    })
  }

  public ionViewDidEnter() {
    // Ask for code to reset password
    this.userService.askResetPassword(this.user.email)
    .then((res: any) => {
      if (res.status != 201) {
        this.navCtrl.back();
      }
    });
  }

  // Check password value when updating
  public onPasswordChange(password: string) {
    const value = password;
    this.passIsDone = false;

    if (this.passwordValue !== null) {
      this.passIsRequired = false;
    }

    if (value.length >= 8 && value.length <= 128) {
      this.passHasMin8Char = true;
    } else {
      this.passHasMin8Char = false;
    }

    const hasLetters = /[a-z]+/.test(value);
    const hasUppercase = /[A-Z]+/.test(value);
    const hasNumber = /[0-9]+/.test(value);
    const hasSpecialChara = /[!@#$%^&*(),.?'"_:{}|<>+=]+/.test(value);

    if (hasLetters && hasUppercase) {
      this.passHasLettersAndUppercase = true;
    } else {
      this.passHasLettersAndUppercase = false;
    }

    if (hasNumber || hasSpecialChara) {
      this.passHasNumberOrSpecial = true;
    } else {
      this.passHasNumberOrSpecial = false;
    }

    if (this.passHasMin8Char && this.passHasLettersAndUppercase && this.passHasLettersAndUppercase) {
      this.passIsDone = true;
    }
  }

  // Display eye icon
  public togglePasswordShow() {
    this.passwordShow = !this.passwordShow;
  }

  // Only number on code field
  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // Validate the code and change password
  public submitForm(): void {
    this.submittedForm = true;
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.setNewResetPwd(this.user.email, this.passwordValue, Number(this.form.value.code))
      .then((res: any) => {
        if (res.status != 201) {
          this.errorCode = true;
          this.spinnerDisplay = false;
        }
        else {
          this.errorCode = false;

          const changeMail = async () => {
            await Preferences.set({
              key: 'change-value',
              value: 'pwd',
            });
          }; changeMail();

          // Get updated user
          this.getUserService.setUser();

          setTimeout(() => {
            this.spinnerDisplay = false;
            this.navCtrl.back();
          }, 1400);
        }
      });
  }
}
