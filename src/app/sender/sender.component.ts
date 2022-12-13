import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideUpAnimation } from '../common/animations';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
  animations: [fadeAnimation, slideUpAnimation]
})
export class SenderComponent implements OnInit {
  public route: String;
  public marginBottom: number;
  public paddingBottom: number;
  public modalHome: boolean;
  public doFadeOutAnimation: boolean;

  constructor(private router: Router) {
    // Get new route when changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = this.router.url.slice(8);
      }
    });

    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.marginBottom = 0.0625 * insets.bottom;
      this.paddingBottom = 0.0625 * (insets.bottom + 62.3);
    });
  }

  ngOnInit(): void { }

  public openModal(name: string) {
    if (name == 'home') {
      this.modalHome = true;
    }
  }

  public closeModalChoice(event: boolean): void {
    if (event) {
      this.doFadeOutAnimation = true;
      setTimeout(() => {
        this.modalHome = false;
      }, 200);
      setTimeout(() => {
        this.doFadeOutAnimation = false;
      }, 200);
    }
  }
}
