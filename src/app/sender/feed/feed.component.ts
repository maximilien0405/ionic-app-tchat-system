import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/angular';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { NetworkService } from 'src/app/common/services/network.service';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation],
})
export class FeedComponent implements OnInit {
  public networkError = false;
  public APIError = false;
  public marginBottom: number;
  public message: string;
  public showIcons: boolean = false;

  constructor(
    private networkService: NetworkService,
    private authService: AuthService,
    private getUserService: GetUserService)
  {
    // Check the API status changes
    this.networkService.subjectApiOrNetworkError.subscribe(res => {
      setTimeout(() => {
        this.APIError = res.apiError;
        this.networkError = res.networkError;
      }, 500);
    })

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * (insets.bottom + 8);
    });
  }

  ngOnInit(): void {
  }

  // Close keyboard
  ionViewWillLeave() {
    Keyboard.hide()
  }

  // Hide camera and microphone icons
  public onMessageChange(message: string) {
    console.log(message)
    if (message == '') {
      this.showIcons = false;
    } else {
      this.showIcons = true;
    }
  }

  public login() {
    // Login the user (temporarely)
    this.authService.login('maximilien.zimmermann@gmail.com', 'Maximilien008')
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
