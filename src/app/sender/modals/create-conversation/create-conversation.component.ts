import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { User } from 'src/app/common/models/user.model';
import { ConversationService } from 'src/app/common/services/conversation.service';
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
  public test: string;
  public marginBottom: number;
  
  constructor(
    private modalController: ModalController,
    private conversationService: ConversationService,
    private router: Router
  ) {}

  ngOnInit() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
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
