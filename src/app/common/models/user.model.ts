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
  subscriptions: [],
  subscriptionStatus: [],
  conversations: [],
  messages: []
}
