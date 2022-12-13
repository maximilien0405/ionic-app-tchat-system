import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { CapacitorHttp } from '@capacitor/core';
import { Photo } from '@capacitor/camera';
import axios, { isCancel, AxiosError } from 'axios';

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

    const response = await CapacitorHttp.get(options);
    return response.data;
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

    const response = await axios.post(url, data, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    return response;
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

    const response = await CapacitorHttp.post(options);
    return response.data;
  }
}
