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
    this.socket.emit('sendMessage', [newMessage, conversation.id, conversation.users]);
  }

  getNewRoomMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('newRoomMessage');
  }

  requestUnreadMessages(): void {
    this.socket.emit('requestUnreadMessages');
  }

  getUnreadMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('newUnreadMessages');
  }

  sendConversationId(conversationId: string, currentMessages: number) {
    this.socket.emit('sendConversationId', [conversationId, currentMessages]);
  }

  getMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages');
  }
}
