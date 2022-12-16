import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderRoutingModule } from './sender-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeSettingsComponent } from './settings/home-settings/home-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { RemindersComponent } from './reminders/reminders.component';
import { AccountComponent } from './settings/account/account.component';
import { SelectThemeComponent } from './modals/select-theme/select-theme.component';
import { SelectLanguageComponent } from './modals/select-language/select-language.component';
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './modals/logout/logout.component';
import { DeleteAccountComponent } from './modals/delete-account/delete-account.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfilePictureComponent } from './modals/profile-picture/profile-picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    HomeComponent,
    SettingsComponent,
    FeedComponent,
    RemindersComponent,
    SelectThemeComponent,
    SelectLanguageComponent,
    LogoutComponent,
    DeleteAccountComponent,
    ProfilePictureComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SenderRoutingModule,
    TranslateModule,
    HttpClientModule,
    ImageCropperModule,
    IonicModule.forRoot({})
  ]
})
export class SenderModule { }
