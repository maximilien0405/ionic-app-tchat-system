import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation } from 'src/app/common/animations';
import { User } from 'src/app/common/models/user.model';
import { ConversationService } from 'src/app/common/services/conversation.service';
import { SubscriptionService } from 'src/app/common/services/subscription.service';
import { CreateGroupComponent } from '../create-group/create-group.component';

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation]
})
export class CreateConversationComponent implements OnInit {
  public hideText: boolean = true;
  public user: User;
  public subscriptionUsers: User[] = [];
  public marginBottom: number;
  
  constructor(
    private modalController: ModalController,
    private conversationService: ConversationService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
    });
  }

  public async ionViewWillEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '');
      }
    }; await getUser();

    // Get subscription members
    this.user.subscriptions.forEach((subscription: any) => {
      this.subscriptionService.findAllMembers(subscription.id)
        .then((res: any) => {
          if (res.data.length != 0) {
            for(let user of res.data) {
              this.subscriptionUsers.push(user);
            }
          }
        });
    });
  }

  // Create or join a conversation
  public createConversation(userId: any) {
    this.conversationService.createNormalConversation('normal', [userId]).then((res: any) => {
      if((res.data.error == true && res.data.conversation) || res.status == 201) {
        // Redirect
        this.modalController.dismiss(null, 'cancel');
        this.router.navigateByUrl('sender/tchat', { state: { conversation: res.data.conversation } });
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
      componentProps: {
        subscriptionUsers: this.subscriptionUsers
      }
    });
    modalConv.present();

    this.modalController.dismiss(null, 'cancel', 'modalConv');
  }
}
