import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { ChoiceHomeComponent } from './modals/choice-home/choice-home.component';
import { ModalController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { AuthService } from '../common/services/auth.service';
import { GetUserService } from '../common/services/get-user.service';
import { NetworkService } from '../common/services/network.service';
import { Preferences } from '@capacitor/preferences';
import { slideUpAnimation } from '../common/animations';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
  animations: [slideUpAnimation]
})
export class SenderComponent implements OnInit {
  public route: String;
  public marginBottom: number;
  public networkOrApiError: boolean;

  constructor(private router: Router,
    private modalController: ModalController,
    private authService: AuthService,
    private getUserService: GetUserService,
    private networkService: NetworkService) {
    // Get new route when changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url.includes('settings')) {
          this.route = 'settings';
        } else {
          this.route = this.router.url.slice(8);
        }
      }
    });

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
    });
  }

  public ngOnInit(): void {
    // Redirect to home
    this.router.navigateByUrl('sender/feed');

    // Login the user (temporarely)
    this.authService.login('maximilien.zimmermann@ik.me', 'Maximilien007')
      .then((res) => {
        if (res.status == 200) {
          const setToken = async () => {
            await Preferences.set({
              key: 'token',
              value: res.token,
            });

            this.getUserService.setUser();
          }; setToken();
        }
      });

    // Check the network status
    this.networkService.checkNetwork().then((res) => {
      console.log(res)
      this.networkOrApiError = res.error;
    });
  }

  public ngAfterViewInit() {

  }

  // Open modals and get back data
  public async openModal(type: string) {
    Haptics.impact({ style: ImpactStyle.Medium });

    const modalHome = await this.modalController.create({
      component: ChoiceHomeComponent,
      cssClass: 'auto-height'
    });

    if (type == 'home') {
      modalHome.present();
    }
  }
}
