import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { Keyboard } from '@capacitor/keyboard';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, IonContent, isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TchatService } from 'src/app/common/services/tchat.service';
import { Conversation } from 'src/app/common/models/conversation.model';
import { Message } from 'src/app/common/models/message.model';
import { User } from 'src/app/common/models/user.model';
import { Location } from '@angular/common';
import { ConversationDetailsComponent } from '../modals/conversation-details/conversation-details.component';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class TchatComponent {
  public marginBottom: number;
  public inputMessage: string;
  public showIcons: boolean = false;
  public conversation: Conversation;
  public conversationId: string;
  public user: User;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public newMessage$: Observable<string>;
  public messages: Message[] = [];
  public messagesIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tchatService: TchatService,
    private modalController: ModalController,
    private location: Location) 
  {
    // Get route param
    this.activatedRoute.params.subscribe(params => {
      this.tchatService.sendConversationId(params['id'], this.messagesIndex);
      this.messagesIndex += 50;
      this.conversationId = params['id'];
    });

    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * (insets.bottom + 8);
    });

    // Get the conversation from routing slate
    const state: any = this.location.getState()
    this.conversation = state.conversation;
  }

  ionViewWillEnter() {
    // Get all messages
    this.tchatService.getMessages().subscribe((messages: Message[]) => {      
      if (this.messagesIndex != 0) {
        this.messages = this.messages.reverse();
      }

      messages.forEach(message => {
        this.messages.push(message);
      });

      this.messages = this.messages.reverse();
      this.scrollToBottom();
    });

    // Get a  new message
    this.tchatService.getNewMessage().subscribe((message: Message) => {
      console.log(message)
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

  // Open details
  public async openConversationDetails() {
    const modalDetails = await this.modalController.create({
      component: ConversationDetailsComponent,
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75,
      componentProps: {
        conversation: this.conversation
      }
    });
    modalDetails.present();
  }

  onIonInfinite(ev: any) {
    console.log("END !!!")
    setTimeout(() => {
      this.tchatService.sendConversationId(this.conversationId, this.messagesIndex);
      this.messagesIndex += 50;
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // Send the message to the room
  public submitMessage() {
    if (this.inputMessage) {
      this.tchatService.sendMessage(this.inputMessage, this.conversation, 'normal', ' ');

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