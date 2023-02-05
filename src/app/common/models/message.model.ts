import { Conversation } from "./conversation.model";
import { User } from "./user.model";

export interface Message {
  id?: string,
  text?: string,
  user?: User,
  type?: string,
  contentUrl?: string,
  conversation?: Conversation,
  updatedAt?: Date,
  createdAt?: Date,
}
