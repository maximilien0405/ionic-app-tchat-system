import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
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

  // Find all members from a subscription
  public async findAllMembers(subscriptionId: string) {
    const options = {
      url: `${this.API_URL}/subscription/${subscriptionId}`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
    };

    return await CapacitorHttp.get(options);
  }

  // Ask code change email
  public async addOrRemoveMember(subscriptionId: string, userId: string, action: string) {
    const options = {
      url: `${this.API_URL}/subscription/members/${subscriptionId}`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      data: { userId, action }
    };

    return await CapacitorHttp.post(options);
  }
}
