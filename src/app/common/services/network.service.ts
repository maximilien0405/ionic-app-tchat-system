import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CapacitorHttp } from '@capacitor/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private readonly API_URL = environment.apiUrl;
  public networkError = false;
  public APIError = false;
  public error = false;

  constructor() { }

  // Check if network is okay or not
  public async checkNetwork() {
    // Listen to network changes
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);

      if(status.connected) {
        this.networkError = false;
      } else {
        this.networkError = true;
        this.error = true;
      }
    });

    // Check if there is network or api error
    const getNetworkStatus = async () => {
      const status = await Network.getStatus();
    
      if(status.connected) {
        this.networkError = false;
      } else {
        this.networkError = true;
        this.error = true;
      }
    }; getNetworkStatus()

    // Ping the API to get a response
    await this.ping().then((res) => {
      if (res == undefined) {
        this.APIError = true;
        this.error = true;
      }
    });

    return { network: this.networkError, api: this.APIError, error: this.error }
  }

  // Ping the server
  public async ping() {
    const options = {
      url: `${this.API_URL}/`,
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await CapacitorHttp.get(options).catch(err => console.log(err));
    return response;
  }
}
