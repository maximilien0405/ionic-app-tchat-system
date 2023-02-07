import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { TchatSocketService } from './tchat-socket.service';

@Injectable({
  providedIn: 'root'
})
export class TchatService {

  constructor(private socket: TchatSocketService) { }

  sendMessage(text: string, conversation: Conversation, type: string, contentUrl: string): void {
    const newMessage: Message = {
      text,
      conversation,
      type,
      contentUrl,
    }

    this.socket.emit('sendMessage', newMessage);
  }

  getNewMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  sendConversationId(conversationId: string) {
    this.socket.emit('sendConversationId', conversationId);
  }

  getConversationAndMessages(): Observable<Conversation> {
    return this.socket.fromEvent<Conversation>('conversationAndMessages');
  }
}
