import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../sender.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private getUserService: GetUserService) {}

  ngOnInit(): void {}

  public login(): any {
    this.authService.login('maximilien.zimmermann@ik.me', 'Maximilien007')
      .then((res) => {
        if (res.error) {
          //Return error
        } else {
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
