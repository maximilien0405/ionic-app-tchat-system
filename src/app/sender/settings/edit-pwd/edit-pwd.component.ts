import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public term = new Subject<string>();
  public submittedForm: boolean;

  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    private getUserService: GetUserService) { }

  public ngOnInit(): void {
    // Create forms
    this.form1 = this.formBuilder.group({
      newPassword: ['', [Validators.minLength(3)]],
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

  // Return form controls
  get f1() { return this.form1.controls; }
  get f2() { return this.form2.controls; }

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
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.askCodeChangeEmail(this.form1.value.mail)
      .catch(err => {
        this.spinnerDisplay = false;
      })
      .then((res) => {
        if (res.error) {
          this.spinnerDisplay = false;
        } else {
          setTimeout(() => {
            this.spinnerDisplay = false;
            this.step = 2;
          }, 1400);
        }
      });
  }

  // Validate the code and change password
  public submitForm2(): void {
    this.submittedForm = true;
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.changeEmail(this.form1.value.mail, this.form2.value.code)
      .catch(err => {
        this.spinnerDisplay = false;
      })
      .then((res) => {
        if (res.error) {
          this.errorCode = true;
          this.spinnerDisplay = false;
        } else {
          setTimeout(() => {
            this.spinnerDisplay = false;
            this.navCtrl.back();
          }, 1400);
        }
      });
  }
}
