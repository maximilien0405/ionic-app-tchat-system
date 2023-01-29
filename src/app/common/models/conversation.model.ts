import { User } from "./user.model";

export interface Conversation {
  id?: string,
  usersIds?: User[],
  updatedAt?: Date,
}
