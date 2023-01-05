import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { isPlatform, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class EditNameComponent implements OnInit {
  public form: FormGroup;
  public spinnerDisplay: boolean;

  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    private getUserService: GetUserService)
  {}

  public ngOnInit(): void {
    // Create form
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(48), Validators.required]],
    })
  }

  // Return form controls
  get f() { return this.form.controls; }

  // Change the name of the user
  public submitForm(): void {
    Haptics.impact({ style: ImpactStyle.Medium });
    this.spinnerDisplay = true;

    this.userService.setFullname(this.form.value.name)
    .then((res: any) => {
      if ((isPlatform('mobile') && res.status == 200) || !isPlatform('mobile')) {
        const changeName = async () => {
          await Preferences.set({
            key: 'change-value',
            value: 'name',
          });
        }; changeName();

        // Get updated user
        this.getUserService.setUser();

        setTimeout(() => {
          this.spinnerDisplay = false;
          this.navCtrl.back();
        }, 1400);
      } else {
        this.spinnerDisplay = false;
      }
    });
  }
}
