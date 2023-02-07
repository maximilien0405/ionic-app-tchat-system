import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user.model';
import { ConversationService } from 'src/app/common/services/conversation.service';
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
    private subscriptionService: SubscriptionService,
    private conversationService: ConversationService,
    private router: Router
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

  // Create or join a conversation
  public createConversation(userId: any) {
    this.conversationService.createNormalConversation('normal', [userId]).then((res: any) => {
      console.log(res)
      if((res.data.error == true && res.data.conversationId) || res.status == 201) {
        // Redirect
        this.modalController.dismiss(null, 'cancel');
        this.router.navigateByUrl('sender/tchat/' + res.data.conversationId);
      }
    })
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
