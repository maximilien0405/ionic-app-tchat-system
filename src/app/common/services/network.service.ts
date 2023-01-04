import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CapacitorHttp } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { isPlatform } from '@ionic/angular';

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
    if (!isPlatform('mobile')) {
      await this.ping().catch(err => {
        APIError = true;
      })
      console.log("asdansdasiosdnio")
    } else if (isPlatform('mobile')) {
      await this.ping().then(res => {
        if (res.status != 200) {
          APIError = true;
        }
      })
    }

    if(status.connected == false) {
      networkError = true;
    }

    console.log(status)

    // Update the value and send to feed component
    this.hasApiOrNetworkError.next({ apiError: APIError, networkError: networkError });

    Network.addListener('networkStatusChange', status => {
      console.log(status)
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
