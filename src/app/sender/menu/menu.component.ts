import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeSettingsComponent } from '../settings/home-settings/home-settings.component';
import { SettingsComponent } from '../settings/settings.component';
import { User } from 'src/app/common/models/user.model';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../sender.component.scss'],
})
export class MenuComponent implements OnInit {
  public user: User;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const getUser = async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value || '')
      }
    }; getUser()
  }

  public async openSettings() {
    const modalSettings = await this.modalController.create({
      component: SettingsComponent,
    });
    modalSettings.present();
  }

}
