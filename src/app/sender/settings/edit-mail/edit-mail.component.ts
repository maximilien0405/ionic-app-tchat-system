import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { slideRightAnimation } from 'src/app/common/animations';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-edit-mail',
  templateUrl: './edit-mail.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [slideRightAnimation]
})
export class EditMailComponent implements OnInit {
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
    private getUserService: GetUserService)
  {}

  public ngOnInit(): void {
    // Create forms
    this.form1 = this.formBuilder.group({
      mail: ['', [Validators.minLength(3), Validators.required, Validators.email]],
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
    this.submittedForm = true;
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.askCodeChangeEmail(this.form1.value.mail)
    .then((res: any) => {
      if(res.status != 201) {
        this.errorCode = true; 
        this.spinnerDisplay = false; 
      }
      else {
        setTimeout(() => {
          this.spinnerDisplay = false;
          this.submittedForm = false;
          this.step = 2;
          this.errorCode = false;
        }, 1400);
      }
    });
  }

  // Validate the code and change email
  public submitForm2(): void {
    this.submittedForm = true;
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.changeEmail(this.form1.value.mail, Number(this.form2.value.code))
    .then((res: any) => {
      if(res.status != 201) {
        this.errorCode = true; 
        this.spinnerDisplay = false; 
      } 
      else {
        const changeMail = async () => {
          await Preferences.set({
            key: 'change-value',
            value: 'mail',
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
