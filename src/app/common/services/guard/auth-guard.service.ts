import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  public helper = new JwtHelperService();
  public result: boolean = false

  constructor() { }

  canActivate(): boolean {

    // Get token from localstorage
    const getToken = async () => {
      const { value } = await Preferences.get({ key: 'token' });
      if (value) {
        this.result = true; 
      }
    }; getToken()
    
    return this.result;
  }
}