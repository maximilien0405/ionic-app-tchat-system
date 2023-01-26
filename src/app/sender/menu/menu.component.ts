import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeSettingsComponent } from '../settings/home-settings/home-settings.component';
import { SettingsComponent } from '../settings/settings.component';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from 'src/app/common/animations';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { SubscriptionService } from 'src/app/common/services/subscription.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation, fadeAnimation]
})
export class MenuComponent implements OnInit {
  public user: User;
  public tchatUsers: User[];
  public marginBottom: number;
  public marginTop: number;
  public showSearch: boolean = false;
  public searchValue: string = '';

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private getUserService: GetUserService,
    private subscriptionService: SubscriptionService)
    { }

  ngOnInit() {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
      this.marginTop = 0.0625 * insets.top;
    });
  }

  public ionViewDidEnter() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')

        // Get subscription members
        for (let index = 0; index < this.user.subscriptionIds.length; index++) {
          const subscription: any = this.user.subscriptionIds[index]
          this.subscriptionService.findAllMembers(subscription.id)
            .then((res: any) => {
              if (res) {
                this.tchatUsers = res.data;
              }
          });
        }
      }
    }; getUser()
  }

  public async openSettings() {
    const modalSettings = await this.modalController.create({
      component: SettingsComponent,
    });
    modalSettings.present();
  }

  public displaySearch() {
    this.showSearch = true;
  }

  public hideSearch() {
    //this.showSearch = false;
    this.searchValue = '';
  }


  public login(user: string) {
    // Login the user (temporarely)
    this.authService.login(user + '@gmail.com', user + '123456')
    .then((res: any) => {
      if(res.status == 201) {
        const setToken = async () => {
          await Preferences.set({
            key: 'token',
            value: res.data.token,
          });

          this.getUserService.setUser();
        }; setToken();
        this.showSearch = false;
      }
    });
  }
}
