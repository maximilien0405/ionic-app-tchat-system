import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    const removeToken = async () => {
      await Preferences.remove({ key: 'token' });
    }; removeToken();
    const removeUser = async () => {
      await Preferences.remove({ key: 'user' });
    }; removeUser();  
    setTimeout(() => {
      this.router.navigateByUrl('start');
    }, 450);
  }
}
