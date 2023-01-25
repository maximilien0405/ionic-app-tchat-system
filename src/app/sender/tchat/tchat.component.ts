import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { NetworkService } from 'src/app/common/services/network.service';
import { Keyboard } from '@capacitor/keyboard';
import { ActivatedRoute } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TchatService } from 'src/app/common/services/tchat.service';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class TchatComponent implements OnInit {
  public networkError = false;
  public APIError = false;
  public marginBottom: number;
  public inputMessage: string;
  public showIcons: boolean = false;
  public id: number;

  public newMessage$: Observable<string>;
  public messages: string[] = [];

  constructor(
    private networkService: NetworkService,
    private authService: AuthService,
    private getUserService: GetUserService,
    private activatedRoute: ActivatedRoute,
    private tchatService: TchatService)
  {
    // Get route param
    this.activatedRoute.params.subscribe(params => this.id = params['id']);

    // Check the API status changes
    // this.networkService.subjectApiOrNetworkError.subscribe(res => {
    //   setTimeout(() => {
    //     this.APIError = res.apiError;
    //     this.networkError = res.networkError;
    //   }, 500);
    // })

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * (insets.bottom + 8);
    });
  }

  ngOnInit() {
    // TODO : refactor - unsubscribe
    return this.tchatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    })
  }

  // Close keyboard
  ionViewWillLeave() {
    if(isPlatform('mobile') && !isPlatform('mobileweb')) {
      Keyboard.hide()
    }
  }

  public submitMessage() {
    this.tchatService.sendMessage(this.inputMessage);
    this.inputMessage = '';
  }

  // Hide camera and microphone icons
  public onMessageChange(message: string) {
    if (message == '') {
      this.showIcons = false;
    } else {
      this.showIcons = true;
    }
  }

  public login() {
    // Login the user (temporarely)
    this.authService.login('maximilien.zimmermann@ik.me', 'Maximilien007')
    .then((res: any) => {
      if(res.status == 201) {
        const setToken = async () => {
          await Preferences.set({
            key: 'token',
            value: res.data.token,
          });

          this.getUserService.setUser();
        }; setToken();
      }
    });
  }
}
