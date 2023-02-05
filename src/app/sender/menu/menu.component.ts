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
  public conversations: Conversation[];

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private getUserService: GetUserService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
      this.marginTop = 0.0625 * insets.top;
    });
  }

  public ionViewDidEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '');

        this.conversationService.getConversationsForUser()
          .then((res: any) => {
            this.conversations = res.data;
        })
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
