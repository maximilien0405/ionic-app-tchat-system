import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/common/models/conversation.model';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class ConversationDetailsComponent implements OnInit {
  public conversation: Conversation;
  
  constructor() { }

  ngOnInit() {}

}
