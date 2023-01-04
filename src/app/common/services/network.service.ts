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
  private hasApiOrNetworkError = new BehaviorSubject<any>({});
  subjectApiOrNetworkError = this.hasApiOrNetworkError.asObservable();

  constructor() { }

  // Check if API and network status
  public async checkAPIAndNetworkStatus() {
    let APIError = false;
    let networkError = false;
    const status = await Network.getStatus();

    // Check if api has an error
    await this.ping().catch(err => {
      APIError = true;
    })

    if(status.connected == false) {
      networkError = true;
    } else {
    }

    // Update the value and send to feed component
    this.hasApiOrNetworkError.next({ apiError: APIError, networkError: networkError });

    Network.addListener('networkStatusChange', status => {
      if(!status.connected) {
        this.hasApiOrNetworkError.next({ apiError: false, networkError: true });
      } else {
        this.hasApiOrNetworkError.next({ apiError: false, networkError: false });
      }
    });
    
    console.log("Api error", APIError)
    console.log("Network Error", networkError)
  }

  // Ping the server
  public async ping() {
    const options = {
      url: `${this.API_URL}/`,
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await CapacitorHttp.get(options);
    return response;
  }
}
