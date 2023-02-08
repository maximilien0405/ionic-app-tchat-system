import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private networkError = false;
  private hasNetworkError = new BehaviorSubject<any>({});
  subjectNetworkError = this.hasNetworkError.asObservable();

  constructor() { }

  // Check if API and network status
  public async checkAPIAndNetworkStatus() {
    const status = await Network.getStatus();

    if(status.connected == false) {
      this.networkError = true;
    }

    // Update the value and send to tchat component
    this.hasNetworkError.next({ networkError: this.networkError });

    Network.addListener('networkStatusChange', status => {

      console.log("Status change", status)

      if(!status.connected) {
        this.hasNetworkError.next({ networkError: true });
      } else {
        this.hasNetworkError.next({ networkError: false });
      }
    });

    console.log("Network Error", this.networkError)
  }
}
