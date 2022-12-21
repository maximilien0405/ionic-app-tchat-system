import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-edit-mail',
  templateUrl: './edit-mail.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class EditMailComponent implements OnInit {
  public form1: FormGroup;
  public form2: FormGroup;
  public spinnerDisplay: boolean;
  public step: number = 1;

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
      code: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.required]],
    })
  }

  // Return form controls
  get f1() { return this.form1.controls; }
  get f2() { return this.form2.controls; }

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

  // Validate the code and change email
  public submitForm2(): void {
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.changeEmail(this.form1.value.mail, this.form2.value.code)
    .catch(err => {
      this.spinnerDisplay = false;
    })
    .then((res) => {
      if (res.error) {
        this.spinnerDisplay = false;
      } else {
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
