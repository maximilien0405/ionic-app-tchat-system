import { Injectable } from '@angular/core';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: environment.apiUrl,
  options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: localStorage.getItem('CapacitorStorage.token')
        },
      },
    },
  }
};

@Injectable({
  providedIn: 'root'
})
export class TchatSocketService extends Socket {

  constructor() {
    super(config)
  }
}
