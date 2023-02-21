import { Component, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { Keyboard } from '@capacitor/keyboard';
import { InfiniteScrollCustomEvent, IonContent, isPlatform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TchatService } from 'src/app/common/services/tchat.service';
import { Conversation } from 'src/app/common/models/conversation.model';
import { Message } from 'src/app/common/models/message.model';
import { User } from 'src/app/common/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class TchatComponent {
  public marginBottom: number;
  public inputMessage: string;
  public showIcons: boolean = true;
  public conversation: Conversation;
  public allConversations: Conversation[];
  public user: User;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public newMessage$: Observable<string>;
  public messages: Message[] = [];
  public messagesToRead: Message[] = [];
  public messagesIndex = 0;

  constructor(
    private tchatService: TchatService,
    private location: Location) 
  {
    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()

    // Get the conversation from routing slate
    const state: any = this.location.getState()
    this.conversation = state.conversation;
    this.allConversations = state.allConversations;
    this.messagesToRead = state.messagesToRead;
  }

  ionViewWillEnter() {
    const state: any = this.location.getState()

    if(state.fromDetails) {
      this.conversation = state.conversation;
      this.allConversations = state.allConversations;
    }

    // Join room
    this.tchatService.sendConversationId(this.conversation.id || '', this.messagesIndex);
    this.messagesIndex += 50;
    
    // Get all messages
    this.tchatService.getMessages().subscribe((messages: Message[]) => {      
      if (this.messagesIndex != 0) {
        this.messages = this.messages.reverse();
      }
      messages.forEach(message => { this.messages.push(message); });
      this.messages = this.messages.reverse();
      this.scrollToBottom();

      if(messages.length != 0) this.tchatService.readLastMessages(this.messagesToRead);
    });

    // Get a  new message
    this.tchatService.getNewRoomMessage().subscribe((message: Message) => {
      this.messages.push(message);
      this.messagesIndex += 1;
      this.scrollToBottom();
    })
  }

  // Scroll to the bottom
  scrollToBottom() {
    this.content.scrollToBottom(0);
  }

  // Close keyboard
  ionViewWillLeave() {
    if (isPlatform('mobile') && !isPlatform('mobileweb')) {
      Keyboard.hide()
    }
  }

  // Execute when reach end of conversation
  onIonInfinite(ev: any) {
    console.log("END !!!")
    setTimeout(() => {
      this.tchatService.sendConversationId(this.conversation.id || '', this.messagesIndex);
      this.messagesIndex += 50;
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // Send the message to the room
  public submitMessage() {
    if (this.inputMessage) {
      this.tchatService.sendMessage(this.inputMessage, this.conversation, 'normal', ' ');
      this.showIcons = true;
    }

    this.inputMessage = '';
  }

  // Hide camera and microphone icons
  public onMessageChange(message: string) {
    if (message != '' && message.trim().length != 0) {
      this.showIcons = false;
    } else {
      this.showIcons = true;
    }
  }
}