import { Conversation } from "./conversation.model";
import { User } from "./user.model";

export interface Message {
  id?: string,
  message?: string,
  userId?: User,
  conversationId?: Conversation,
  createdAt?: Date,
}
