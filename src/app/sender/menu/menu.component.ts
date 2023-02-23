import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { CreateConversationComponent } from '../modals/create-conversation/create-conversation.component';
import { ConversationService } from 'src/app/common/services/conversation.service';
import { Conversation } from 'src/app/common/models/conversation.model';
import { SubscriptionService } from 'src/app/common/services/subscription.service';
import { NetworkService } from 'src/app/common/services/network.service';
import { TchatService } from 'src/app/common/services/tchat.service';
import { Message } from 'src/app/common/models/message.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class MenuComponent implements OnInit {
  public user: User;
  public marginBottom: number;
  public marginTop: number;
  public showSearch: boolean = false;
  public searchValue: string = '';
  public allLoaded: boolean = false;

  public recieverConversations: Conversation[] = [];
  public contactConversations: Conversation[] = [];
  public networkError = false;
  public APIError = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private getUserService: GetUserService,
    private conversationService: ConversationService,
    private subscriptionService: SubscriptionService,
    private networkService: NetworkService,
    private tchatService: TchatService
  ) {
    // Check the network status
    this.networkService.checkAPIAndNetworkStatus();

    // Check the API status changes
    this.networkService.subjectNetworkError.subscribe(res => {
      setTimeout(() => {
        this.networkError = res.networkError;
      }, 500);
    })

    // Get conversation when new msg
    this.tchatService.getConversations().subscribe(res => {
      this.getConversations();
    })
  }

  ngOnInit() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
      this.marginTop = 0.0625 * insets.top;
    });
  }

  public async ionViewWillEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '');
      }
    }; await getUser();


    // Get all conversations
    this.getConversations();
  }

  // Get conversations
  public async getConversations() {
    this.conversationService.getConversationsForUser()
      .catch((res: any) => {
        this.APIError = true;
        this.allLoaded = true
      })
      .then((res: any) => {
        if (res.status == 200) {
          let recieverConversations = [];
          let contactConversations = res.data;

          for (let i = 0; i < contactConversations.length; i++) {
            const element = contactConversations[i];

            if (element.users[0].type == 'reciever') {
              recieverConversations.push(element);
              contactConversations.splice(i, 1);
            }
          }

          console.log(contactConversations)

          this.contactConversations = contactConversations;
          this.recieverConversations = recieverConversations;
          this.allLoaded = true;
        } else {
          this.APIError = true;
          this.allLoaded = true;
        }
      })
  }

  public async openCreateConv() {
    const modalConv = await this.modalController.create({
      component: CreateConversationComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      id: 'modalConv'
    });
    modalConv.present();
  }

  public displaySearch() {
    this.showSearch = true;
  }

  public hideSearch() {
    //this.showSearch = false;
    this.searchValue = '';
  }
}
