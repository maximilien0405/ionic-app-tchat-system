import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeSettingsComponent } from '../settings/home-settings/home-settings.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../sender.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public async openSettings() {
    const modalSettings = await this.modalController.create({
      component: SettingsComponent,
    });
    modalSettings.present();
  }

}
