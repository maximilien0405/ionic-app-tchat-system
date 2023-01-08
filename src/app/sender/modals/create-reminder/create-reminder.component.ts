import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class CreateReminderComponent implements OnInit {
  name: string;

  public ngOnInit(){}

  constructor(private modalController: ModalController) { }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.name, 'confirm');
  }
}
