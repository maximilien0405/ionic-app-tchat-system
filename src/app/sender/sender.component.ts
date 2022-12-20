import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { ChoiceHomeComponent } from './modals/choice-home/choice-home.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  public route: String;
  public marginBottom: number;

  constructor(private router: Router, private modalController: ModalController) {
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
  }

  // Open modals and get back data
  public async openModal(type: string) {
    const modalHome = await this.modalController.create({
      component: ChoiceHomeComponent,
      cssClass: 'auto-height'
    });

    if (type == 'home') {
      modalHome.present();
    }
  }
}
