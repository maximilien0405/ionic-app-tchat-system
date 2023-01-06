import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { slideUpAnimation } from 'src/app/common/animations';
import { CreateReminderComponent } from '../create-reminder/create-reminder.component';

@Component({
  selector: 'app-choice-home',
  templateUrl: './choice-home.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [slideUpAnimation]
})
export class ChoiceHomeComponent implements OnInit {
  public displayReminderModal: boolean;

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  public async showModal(name: string) {
    //this.displayReminderModal = true;

    const modalReminder = await this.modalController.create({
      component: CreateReminderComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height'
    });

    if (name == 'reminder') {
      modalReminder.present();
    }

    setTimeout(() => {
      this.modalController.dismiss(undefined, undefined, 'modal-home');
    }, 200);
  }
}