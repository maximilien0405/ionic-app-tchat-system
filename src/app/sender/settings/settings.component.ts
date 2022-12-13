import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { fadeAnimation, slideRightAnimation, slideUpAnimation } from 'src/app/common/animations';
import { User } from 'src/app/common/models/user.model';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { HomeSettingsComponent } from './home-settings/home-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [fadeAnimation, slideUpAnimation, slideRightAnimation]
})
export class SettingsComponent implements OnInit {
  public component: HomeSettingsComponent;

  public ngOnInit(): void {}
}
