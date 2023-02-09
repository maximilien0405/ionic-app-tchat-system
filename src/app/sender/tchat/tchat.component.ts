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
import { Location } from '@angular/common';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class TchatComponent implements OnInit {
  public marginBottom: number;
  public inputMessage: string;
  public showIcons: boolean = false;
  public conversation: Conversation;
  public conversationId: string;
  public user: User;

  public newMessage$: Observable<string>;
  public messages: Message[] = [];
  public messagesIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tchatService: TchatService,
    private location: Location
  ) {
    // Get route param
    this.activatedRoute.params.subscribe(params => {
      this.tchatService.sendConversationId(params['id'], this.messagesIndex);
      this.messagesIndex += 2;
      this.conversationId = params['id'];
    });

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

    // Get the conversation from routing slate
    const state: any = this.location.getState()
    this.conversation = state.conversation;
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.tchatService.getMessages().subscribe((messages: Message[]) => {
      if (this.messagesIndex != 0) {
        this.messages = this.messages.reverse();
      }
      
      messages.forEach(message => {
        this.messages.push(message);
      });

      this.messages = this.messages.reverse();
    });
  }

  // Close keyboard
  ionViewWillLeave() {
    if(isPlatform('mobile') && !isPlatform('mobileweb')) {
      Keyboard.hide()
    }
  }

  public loadMoreMessages() {
    this.tchatService.sendConversationId(this.conversationId, this.messagesIndex);
    this.messagesIndex += 2;
  }

  public submitMessage() {
    if(this.inputMessage) {
      this.tchatService.sendMessage(this.inputMessage, this.conversation, 'normal', ' ');
    
      this.tchatService.getNewMessage().subscribe((message: Message) => {
        this.messages.push(message);
        this.messagesIndex += 1;
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
