import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WhoAreYouComponent } from './who-are-you/who-are-you.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    WhoAreYouComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})
export class StartModule { }
