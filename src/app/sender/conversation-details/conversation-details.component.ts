import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Conversation } from 'src/app/common/models/conversation.model';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['../sender.component.scss'],
})
export class ConversationDetailsComponent implements OnInit {
  public conversation: Conversation;
  public groupConversations: Conversation[] = [];
  public allConversations: Conversation[];
  public user: User;
  
  constructor(private location: Location) {
    // Get the conversation from routing slate
    const state: any = this.location.getState()
    this.conversation = state.conversation;
    this.allConversations = state.allConversations;
  }

  ngOnInit() {
    // Get token from localstorage
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()

    this.allConversations.forEach((conversation: any) => {
      if(conversation.type == 'group') {
        conversation.users.forEach((user: any) => {
          if(user.id == conversation.users[0].id) {
            this.groupConversations.push(conversation)
          }
        });
      }
    });
  }
}
