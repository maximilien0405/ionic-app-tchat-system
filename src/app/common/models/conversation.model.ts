import { Message } from "./message.model";
import { User } from "./user.model";

export interface Conversation {
  id?: string,
  groupName?: string,
  users: User[],
  creatorId?: string,
  type?: string,
  groupPictureUrl?: string,
  messages: Message[],
  newMessage: boolean;
  newMessageCount: number,
  updatedAt?: Date,
  createdAt?: Date,
}
