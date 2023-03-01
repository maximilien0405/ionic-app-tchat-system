import { Conversation } from "./conversation.model"
import { Message } from "./message.model"
import { ReadBy } from "./readby.model"

export interface User {
  id: string,
  email: string,
  //isLoggedWithGoogle: boolean,
  //isLoggedWithApple: boolean,
  firstname: string,
  lastname: string,
  about: string,
  type: string,
  profilePictureUrl: string,
  emailValidated: boolean,
  readBys?: ReadBy[],
  subscriptions: [],
  subscriptionStatus: [],
  conversations: Conversation[],
  messages: Message[]
}
