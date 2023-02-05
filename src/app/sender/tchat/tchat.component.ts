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

  public contactId: string;
  public contact: User;
  public contacts: User[];

  public newMessage$: Observable<string>;
  public messages: Message[] = [];

  public userId: string;
  public conversations$: Observable<Conversation[]>;
  public conversations: Conversation[] = [];
  public conversation: Conversation;

  constructor(
    private networkService: NetworkService,
    private activatedRoute: ActivatedRoute,
    private tchatService: TchatService)
  {
    // Get route param
    this.activatedRoute.params.subscribe(params => this.contactId = params['id']);

    // Check the API status changes
    // this.networkService.subjectApiOrNetworkError.subscribe(res => {
    //   setTimeout(() => {
    //     this.APIError = res.apiError;
    //     this.networkError = res.networkError;
    //   }, 500);
    // })

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * (insets.bottom + 8);
    });

    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        const user = JSON.parse(value || '')
        this.userId = user.id;
      }
    }; getUser()

    // Get friend from route
    // const getContact = async () => {
    //   const { value }: any = await Preferences.get({ key: 'contacts' });
    //   if (value) {
    //     const contacts: User[] = JSON.parse(value || '');
    //     this.contacts = contacts;

    //     contacts.forEach(contact => {
    //       if (contact.id == this.contactId) {
    //         this.contact = contact;
    //       }
    //     });
    //   }
    // }; getContact()

    // this.tchatService.leaveConversation();
    // this.messages = [];
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    // this.tchatService.getConversations().subscribe((conversations: Conversation[]) => {
    //   this.conversations.push(conversations[0]);
    // });

    // this.tchatService.getConversationMessages().subscribe((messages: Message[]) => {
    //   messages.forEach((message: Message) => {
    //     const allMessagesId = this.messages.map((message: Message) => message.id)
    //     if (!allMessagesId.includes(message.id)) {
    //       this.messages.push(message);
    //     }
    //   })
    //   console.log("getting all the messages...", messages)
    // });

    // this.tchatService.getNewMessage().subscribe((message: Message) => {
    //   message.createdAt = new Date();

    //   const allMessagesId = this.messages.map((message: Message) => message.id)
    //   if (!allMessagesId.includes(message.id)) {
    //     this.messages.push(message);
    //   }
    // })

    // this.contacts.forEach(contact => {
    //   this.tchatService.createConversation(contact);
    // });

    // this.tchatService.joinConversation(this.contact.id)
  }

  ionViewDidLeave() {
    this.tchatService.leaveConversation();
  }

  // Close keyboard
  ionViewWillLeave() {
    if(isPlatform('mobile') && !isPlatform('mobileweb')) {
      Keyboard.hide()
    }
  }

  public submitMessage() {
    // let conversationUserIds = [this.userId, this.contactId].sort();

    // this.conversations.forEach((conversation: Conversation) => {
    //   let usersIds = conversation.usersIds?.map((user: User) => user.id).sort();

    //   if (JSON.stringify(conversationUserIds) == JSON.stringify(usersIds)) {
    //     this.conversation = conversation;
    //   }
    // })

    // console.log(this.conversations)

    // this.tchatService.sendMessage(this.inputMessage, this.conversation);
    // this.inputMessage = '';
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
