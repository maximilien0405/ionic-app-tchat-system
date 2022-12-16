import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class EditNameComponent implements OnInit {
  public close: boolean;
  public form: FormGroup;
  public spinnerDisplay: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    // Create form
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(32), Validators.required]],
    })
  }

  // Return form controls
  get f() { return this.form.controls; }

  // Change the name of the user
  public submitForm(): void {
    Haptics.impact({ style: ImpactStyle.Medium });

    this.spinnerDisplay = true;

    setTimeout(() => {
      this.spinnerDisplay = false;
      this.location.back();
      // Go to previous page !!!!
    }, 1400);
  }
}
