export interface User {
  id: string,
  email: string,
  //isLoggedWithGoogle: boolean,
  //isLoggedWithApple: boolean,
  firstname: string,
  lastname: string,
  about: string,
  profilePictureUrl: string,
  emailValidated: boolean,
  subscriptionIds: [],
  subscriptionStatusIds: [],
  type: string
}
