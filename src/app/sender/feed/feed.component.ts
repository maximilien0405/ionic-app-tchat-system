import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/angular';
import { slideUpAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { NetworkService } from 'src/app/common/services/network.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation]
})
export class FeedComponent implements OnInit {
  public networkError = false;
  public APIError = false;

  constructor(
    private networkService: NetworkService,
    private authService: AuthService,
    private getUserService: GetUserService)
  {
    // Check the API status changes
    this.networkService.subjectApiOrNetworkError.subscribe(res => {
      setTimeout(() => {
        console.log(res)
        this.APIError = res.apiError;
        this.networkError = res.networkError;
      }, 500);
    })
  }

  ngOnInit(): void {}

  public login() {
      // Login the user (temporarely)
      this.authService.login('maximilien.zimmermann@ik.me', 'Maximilien007')
      .then((res) => {
        if ((isPlatform('mobile') && res.status == 200) || !isPlatform('mobile')) {
          const setToken = async () => {
            await Preferences.set({
              key: 'token',
              value: res.token,
            });

            this.getUserService.setUser();
          }; setToken();
        }
      });
  }
}