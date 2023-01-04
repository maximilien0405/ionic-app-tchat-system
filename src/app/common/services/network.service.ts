import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  private hasApiError = new BehaviorSubject<any>({});
  subjectApiError = this.hasApiError.asObservable();
  private hasNetworkError = new BehaviorSubject<any>({});
  subjectNetworkError = this.hasNetworkError.asObservable();

  constructor() { }

  // Check if API is okay or not
  public async checkAPIStatus() {
    await this.ping().then((res: any) => {
      if (res.status != 200) {
        this.APIError = true;
      }
    });

    this.hasApiError.next(this.APIError);
    return this.APIError;
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

  // Check if network is okay or not
  public async checkNetworkStatus() {
    const status = await Network.getStatus();
    if(!status.connected) {
      this.hasNetworkError.next(!status.connected);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      this.networkError = true;
    }

    // Listen to network changes
    Network.addListener('networkStatusChange', status => {
      if(!status.connected) {
        this.hasNetworkError.next(!status.connected);
        this.networkError = true;
      }
    });

    return this.networkError;
  }
}
