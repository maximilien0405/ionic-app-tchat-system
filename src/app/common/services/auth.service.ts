import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private token: string;

  constructor() {
    // Get token from localstorage
    const getToken = async () => {
      const { value } = await Preferences.get({ key: 'token' });
      if (value) {
        this.token = value;
      }
    }; getToken()
  }

  // Login a user
  public async login(email: string, password: string) {
    const options = {
      url: `${this.API_URL}/user/login`,
      data: { email, password },
      headers: { 'Content-Type': 'application/json' },
    };

    return await CapacitorHttp.post(options);
  }
}
