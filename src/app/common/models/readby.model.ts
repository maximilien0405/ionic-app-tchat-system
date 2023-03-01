import { Conversation } from "./conversation.model";
import { Message } from "./message.model";
import { User } from "./user.model";

export interface ReadBy {
  id?: string,
  user?: User,
  message?: Message,
  read?: boolean,
  totalRead?: boolean,
  updatedAt?: Date,
  createdAt?: Date,
}