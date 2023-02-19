import { Message } from "./message.model";
import { User } from "./user.model";

export interface Conversation {
  id?: string,
  groupName?: string,
  users: User[],
  creator?: User,
  type?: string,
  groupPictureUrl?: string,
  messages: Message[],
  newMessage: boolean;
  newMessageCount: number,
  updatedAt?: Date,
  createdAt?: Date,
}
