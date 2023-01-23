import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { CapacitorHttp } from '@capacitor/core';
import { Photo } from '@capacitor/camera';
import axios, { isCancel, AxiosError } from 'axios';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  // Find a new user
  public async findOne(userId: string) {
    const options = {
      url: `${this.API_URL}/user/${userId}`,
      headers: { 'Content-Type': 'application/json' },
    };

    return await CapacitorHttp.get(options);
  }

  // Set new profile picture
  public async setNewProfilePicture(image: Blob) {
    const data = new FormData();
    data.append("file", image);

    const url = `${this.API_URL}/user/new-profile-picture`;
    const config = {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
      }
    };

    return await axios.post(url, data, config);
  }

  // Set full name
  public async setFullname(fullName: string) {
    const options = {
      url: `${this.API_URL}/user/set-fullname`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      data: { fullName }
    };

    return await CapacitorHttp.patch(options);
  }

  // Ask code change email
  public async askCodeChangeEmail(newEmail: string) {
    const options = {
      url: `${this.API_URL}/user/ask-code-change-email`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      data: { newEmail }
    };

    return await CapacitorHttp.post(options);
  }

  // Change email
  public async changeEmail(newEmail: string, code: number) {
    const options = {
      url: `${this.API_URL}/user/change-email`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      data: { newEmail, code }
    };

    return await CapacitorHttp.post(options);
  }

  // Ask code to change password
  public async askChangePassword(currentPassword: string) {
    const options = {
      url: `${this.API_URL}/user/ask-change-pwd`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      data: { currentPassword }
    };

    return await CapacitorHttp.post(options);
  }

  // Change password
  public async setNewChangePwd(newPassword: string, code: number) {
    const options = {
      url: `${this.API_URL}/user/set-new-change-pwd`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      data: { newPassword, code }
    };

    return await CapacitorHttp.post(options);
  }

  // Ask reset code to change password
  public async askResetPassword(email: string) {
    const options = {
      url: `${this.API_URL}/user/ask-reset-pwd`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { email }
    };

    return await CapacitorHttp.post(options);
  }

  // Change password with reset
  public async setNewResetPwd(email: string, newPassword: string, code: number) {
    const options = {
      url: `${this.API_URL}/user/set-new-reset-pwd`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { email, newPassword, code }
    };

    return await CapacitorHttp.post(options);
  }
}
