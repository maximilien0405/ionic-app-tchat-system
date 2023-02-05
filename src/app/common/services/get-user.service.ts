import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  private token: string;

  constructor(private userService: UserService) {
    // Get token from localstorage
    const getToken = async () => {
      const { value } = await Preferences.get({ key: 'token' });
      if (value) {
        this.token = value;
      }
    }; getToken()
  }

  // Get token from localstorage
  public setUser = async () => {
    this.userService.findOne()
      .then((res: any) => {
        if (res.status == 200) {
          const setUser = async () => {
            await Preferences.set({
              key: 'user',
              value: JSON.stringify(res.data),
            });
          }; setUser();
        }
      });
  };
}
