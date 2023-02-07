import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { NetworkService } from 'src/app/common/services/network.service';
import { Keyboard } from '@capacitor/keyboard';
import { ActivatedRoute } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TchatService } from 'src/app/common/services/tchat.service';
import { Conversation } from 'src/app/common/models/conversation.model';
import { Message } from 'src/app/common/models/message.model';
import { UserService } from 'src/app/common/services/user.service';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class TchatComponent implements OnInit {
  public networkError = false;
  public APIError = false;
  public marginBottom: number;
  public inputMessage: string;
  public showIcons: boolean = false;

  public conversationId: string;
  public conversation: Conversation;
  public user: User;

  public newMessage$: Observable<string>;
  public messages: Message[] | undefined = [];

  constructor(
    private networkService: NetworkService,
    private activatedRoute: ActivatedRoute,
    private tchatService: TchatService)
  {
    // Get route param
    this.activatedRoute.params.subscribe(params => this.conversationId = params['id']);

    // Check the API status changes
    // this.networkService.subjectApiOrNetworkError.subscribe(res => {
    //   setTimeout(() => {
    //     this.APIError = res.apiError;
    //     this.networkError = res.networkError;
    //   }, 500);
    // })

    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * (insets.bottom + 8);
    });

    this.messages = [];
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.tchatService.sendConversationId(this.conversationId);

    this.tchatService.getConversationAndMessages().subscribe((conversation) => {
      if(conversation.type == 'normal') {
        for (let i = 0; i < conversation.users.length; i++) {
          if (conversation.users[i].id === this.user.id) {
            conversation.users.splice(i, 1);
          }
        }
      }

      this.conversation = conversation;
      this.messages = conversation?.messages;
      // messages.forEach((message: Message) => {
      //   const allMessagesId = this.messages.map((message: Message) => message.id)
      //   if (!allMessagesId.includes(message.id)) {
      //     this.messages.push(message);
      //   }
      // })
    });

  }

  // Close keyboard
  ionViewWillLeave() {
    if(isPlatform('mobile') && !isPlatform('mobileweb')) {
      Keyboard.hide()
    }
  }

  public submitMessage() {
    if(this.inputMessage) {
      this.tchatService.sendMessage(this.inputMessage, this.conversation, 'normal', ' ');
    
      this.tchatService.getNewMessage().subscribe((message: Message) => {
        this.messages?.push(message);
      })
    }

    this.inputMessage = '';
  }

  // Hide camera and microphone icons
  public onMessageChange(message: string) {
    if (message == '') {
      this.showIcons = false;
    } else {
      this.showIcons = true;
    }
  }
}
