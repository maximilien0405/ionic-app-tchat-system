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
  public subscriptionUsers: User[];
  public networkError = false;
  public APIError = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private getUserService: GetUserService,
    private conversationService: ConversationService,
    private subscriptionService: SubscriptionService,
    private networkService: NetworkService
  ) {
    // Check the network status
    this.networkService.checkAPIAndNetworkStatus();

    // Check the API status changes
    this.networkService.subjectNetworkError.subscribe(res => {
      setTimeout(() => {
        this.networkError = res.networkError;
      }, 500);
    })
  }

  ngOnInit() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
      this.marginTop = 0.0625 * insets.top;
    });
  }

  public ionViewWillEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '');

        // Get all conversations
        this.conversationService.getConversationsForUser()
          .catch((res: any) => {
            this.APIError = true;
            this.allLoaded = true
          })
          .then((res: any) => {
            let recieverConversations = []
            let contactConversations = res.data;

            contactConversations.forEach((conversation: any) => {
              for (let i = 0; i < conversation.users.length; i++) {
                if (conversation.users[i].id === this.user.id) {
                  conversation.users.splice(i, 1);
                }
              }
            });

            for (let i = 0; i < contactConversations.length; i++) {
              const element = contactConversations[i];

              if(element.users[0].type == 'reciever') {
                recieverConversations.push(element);
                contactConversations.splice(i, 1);
              }
            }

            this.contactConversations = contactConversations;
            this.recieverConversations = recieverConversations;
            this.allLoaded = true;
        })


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

  public async openCreateConv() {
    const modalConv = await this.modalController.create({
      component: CreateConversationComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      id: 'modalConv',
      componentProps: {
        subscriptionUsers: this.subscriptionUsers
      }
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

  public login(user: string) {
    // Login the user (temporarely)
    this.authService
      .login(user + '@gmail.com', user + '123456')
      .then((res: any) => {
        if (res.status == 201) {
          const setToken = async () => {
            await Preferences.set({
              key: 'token',
              value: res.data.token,
            });

            this.getUserService.setUser();
          };
          setToken();
          this.showSearch = false;
        }
      });
  }
}
