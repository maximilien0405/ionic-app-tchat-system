import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { catchError, of } from 'rxjs';
import { fadeAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
  public marginTop: Number;

  constructor(private authService: AuthService, private getUserService: GetUserService) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginTop = 0.0625 * (insets.top + 5);
    });
  }

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

            this.getUserService.getToken();
          }; setToken();
        }
    });
  }
}
