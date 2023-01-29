import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { TchatSocketService } from './tchat-socket.service';

@Injectable({
  providedIn: 'root'
})
export class TchatService {

  constructor(private socket: TchatSocketService) { }

  sendMessage(message: string, conversationId: Conversation): void {
    const newMessage: Message = {
      message,
      conversationId
    }

    this.socket.emit('sendMessage', newMessage);
  }

  getNewMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  createConversation(contact: User): void {
    this.socket.emit('createConversation', contact);
  }

  joinConversation(contactId: string): void {
    this.socket.emit('joinConversation', contactId);
  }

  leaveConversation(): void {
    this.socket.emit('leaveConversation');
  }

  getConversationMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages');
  }

  getConversations(): Observable<Conversation[]> {
    return this.socket.fromEvent<Conversation[]>('conversations');
  }
}
