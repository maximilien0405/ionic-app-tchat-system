import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';

@Component({
  selector: 'app-who-are-you',
  templateUrl: './who-are-you.component.html',
  styleUrls: ['../start.component.scss']
})
export class WhoAreYouComponent implements OnInit {

  constructor(private authService: AuthService, private getUserService: GetUserService, private router: Router) { }

  ngOnInit(): void {}

  public login(user: string) {
    // Login the user (temporarely)
    this.authService
      .login(user + '@gmail.com', user + '123456')
      .then(async (res: any) => {
        if (res.status == 201) {
          const setToken = async () => {
            await Preferences.set({
              key: 'token',
              value: res.data.token,
            });
          }; await setToken();

          this.getUserService.setUser();

          setTimeout(() => {
            this.router.navigateByUrl('sender/menu')
          }, 2000) 
        }
      });
  }
}
