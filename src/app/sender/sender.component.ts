import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { ChoiceHomeComponent } from './modals/choice-home/choice-home.component';
import { ModalController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NetworkService } from '../common/services/network.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
})
export class SenderComponent implements OnInit {
  public route: String;
  public marginBottom: number;
  public apiError: boolean;
  public networkError: boolean;

  constructor(private router: Router,
    private modalController: ModalController,
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
      this.marginBottom = 0.0625 * (insets.bottom || 15);
    });

    // Check the network status
    this.networkService.checkAPIAndNetworkStatus();

    // Check the API status changes
    this.networkService.subjectApiOrNetworkError.subscribe(res => {
      console.log(res)
      this.apiError = res.apiError;
      this.networkError = res.networkError;
    })
  }

  public ngOnInit(): void {
    // Redirect to home
    this.router.navigateByUrl('sender/feed');
  }

  // Open modals and get back data
  public async openModal(type: string) {
    Haptics.impact({ style: ImpactStyle.Medium });

    const modalHome = await this.modalController.create({
      component: ChoiceHomeComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'auto-height',
      id: 'modal-home'
    });

    if (type == 'home') {
      modalHome.present();
    }
  }
}
