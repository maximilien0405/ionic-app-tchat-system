import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { slideRightAnimation } from 'src/app/common/animations';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-edit-pwd',
  templateUrl: './edit-pwd.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [slideRightAnimation]
})
export class EditPwdComponent implements OnInit {
  public form1: FormGroup;
  public form2: FormGroup;
  public spinnerDisplay: boolean;
  public step: number = 1;
  public errorCode: boolean;
  public errorPwd: boolean;
  public term = new Subject<string>();
  public submittedForm: boolean;
  public passwordShow1: boolean;
  public passwordShow2: boolean;
  public passHasLettersAndUppercase: boolean;
  public passHasNumberOrSpecial: boolean;
  public passHasMin8Char: boolean;
  public passInfos: boolean;
  public passwordValue: string;
  public passIsDone: boolean;
  public passSubmited: boolean;
  public passIsRequired: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController,
    private getUserService: GetUserService)
  { }

  public ngOnInit(): void {
    // Create forms
    this.form1 = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
    })

    this.form2 = this.formBuilder.group({
      code: ['', [Validators.required]],
    })

    // Listen on code value
    this.form2.get('code')?.valueChanges.subscribe((selectedValue: any) => {
      if (!selectedValue) {
        this.errorCode = false;
      }
    })
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

  // Return form controls
  get f1() { return this.form1.controls; }
  get f2() { return this.form2.controls; }

  // Display eye icon
  public togglePasswordShow1() {
    this.passwordShow1 = !this.passwordShow1;
  }
  public togglePasswordShow2() {
    this.passwordShow2 = !this.passwordShow2;
  }

  // On code change execute
  public onCodeChange(code: string): void {
    if (code == "") {
      this.errorCode = false;
      return;
    }
    if (code.length == 5) {
      this.term.next(code);
    }
  }

  // Only number on code field
  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // Ask for a code
  public submitForm1(): void {
    this.submittedForm = true;
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;
    this.passSubmited = true;

    // If form empty then error
    if (this.passwordValue == null) {
      this.passIsRequired = true;
      return;
    }

    if (!this.passIsDone) { return; }

    this.userService.askChangePassword(this.form1.value.currentPassword)
      .then((res: any) => {
        if (res.status != 201) {
          this.errorPwd = true;
        }
        else {
          this.errorPwd = false;

          setTimeout(() => {
            this.step = 2;
            this.submittedForm = false;
          }, 1400);
        }
        this.spinnerDisplay = false;
      });
  }

  // Validate the code and change password
  public submitForm2(): void {
    this.submittedForm = true;
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.setNewChangePwd(this.passwordValue, Number(this.form2.value.code))
      .then((res: any) => {
        if (res.status != 201) {
          this.errorCode = true;
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
        this.spinnerDisplay = false;
      });
  }
}
