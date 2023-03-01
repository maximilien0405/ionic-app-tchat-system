import { Conversation } from "./conversation.model";
import { ReadBy } from "./readby.model";
import { User } from "./user.model";

export interface Message {
  id?: string,
  text?: string,
  user?: User,
  type?: string,
  contentUrl?: string,
  conversation?: Conversation,
  readBys: ReadBy[],
  allRead?: boolean,
  updatedAt?: Date,
  createdAt?: Date,
}
