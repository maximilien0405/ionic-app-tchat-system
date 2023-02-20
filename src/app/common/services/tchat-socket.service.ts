import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: environment.apiUrl
};

@Injectable({ providedIn: 'root' })
export class TchatSocketService extends Socket {
  constructor() {
    super(config);

    const getToken = async () => {
      const { value } = await Preferences.get({ key: 'token' });
      if (value) {
        this.ioSocket['auth'] = { token: value };
      }
    }; getToken()
  }
}