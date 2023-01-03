import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  public helper = new JwtHelperService();

  constructor(private userService: UserService) { }

  // Get token from localstorage
  public setUser = async () => {
    const { value } = await Preferences.get({ key: 'token' });
    if (value) {
      // Decode the token to get the id
      const decodedToken = this.helper.decodeToken(value);

      this.userService.findOne(decodedToken.id)
        .then((res) => {
          if (res.status == 200) {
            const setUser = async () => {
              await Preferences.set({
                key: 'user',
                value: JSON.stringify(res),
              });
            }; setUser();
          }
        });
    }
  };
}
