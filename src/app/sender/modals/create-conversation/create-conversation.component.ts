import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user.model';
import { SubscriptionService } from 'src/app/common/services/subscription.service';
import { CreateGroupComponent } from '../create-group/create-group.component';

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class CreateConversationComponent implements OnInit {
  public hideText: boolean = true;
  public user: User;
  public subscriptionUsers: User[];

  constructor(
    private modalController: ModalController,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {}

  public ionViewWillEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '');

        // Get subscription members
        this.user.subscriptions.forEach((element: any) => {
          this.subscriptionService
            .findAllMembers(element.id)
            .then((res: any) => {
              if (res.data.length != 0) {
                this.subscriptionUsers = res.data;
              }
            });
        });
      }
    };
    getUser();
  }

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
