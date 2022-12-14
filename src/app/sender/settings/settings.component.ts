import { Component, OnInit } from '@angular/core';
import { HomeSettingsComponent } from './home-settings/home-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../sender.component.scss'],
})
export class SettingsComponent implements OnInit {
  public component = HomeSettingsComponent;

  public ngOnInit(): void {}
}