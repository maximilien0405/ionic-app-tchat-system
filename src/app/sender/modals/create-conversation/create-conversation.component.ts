import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateGroupComponent } from '../create-group/create-group.component';

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class CreateConversationComponent implements OnInit {
  public hideText: boolean = true;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  
  // Close the popup
  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public async openCreateGroup() {
    const modalConv = await this.modalController.create({
      component: CreateGroupComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    modalConv.present();

    this.modalController.dismiss(null, 'cancel', 'modalConv');
  }
}
