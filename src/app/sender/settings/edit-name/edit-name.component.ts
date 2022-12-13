import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideRightAnimation, slideUpAnimation } from 'src/app/common/animations';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation, slideRightAnimation, slideUpAnimation]
})
export class EditNameComponent implements OnInit {
  public close: boolean;
  public paddingTop: number;
  public form: FormGroup;
  public spinnerDisplay: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.paddingTop = 0.0625 * (insets.top + 5);
    });
  }

  ngOnInit(): void {
    // Create form
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(32), Validators.required]],
    })
  }

  // Return form controls
  get f() { return this.form.controls; }

  public closePage(): void {
    this.close = true;
    setTimeout(() => {
      this.closeValue.emit(true);
    }, 250);
  }



  // Change the name of the user
  public submitForm(): void {
    Haptics.impact({ style: ImpactStyle.Medium });

    this.spinnerDisplay = true;

    setTimeout(() => {
      this.spinnerDisplay = false;
      this.closePage();
    }, 1400);
  }
}
