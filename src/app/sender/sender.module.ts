import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SenderRoutingModule } from './sender-routing.module';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { RemindersComponent } from './reminders/reminders.component';
import { AccountComponent } from './settings/account/account.component';
import { SelectThemeComponent } from './modals/select-theme/select-theme.component';
import { SelectLanguageComponent } from './modals/select-language/select-language.component';
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './modals/logout/logout.component';
import { AboutComponent } from './settings/about/about.component';
import { DeleteAccountComponent } from './modals/delete-account/delete-account.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditPwdComponent } from './settings/edit-pwd/edit-pwd.component';
import { EditNameComponent } from './settings/edit-name/edit-name.component';
import { EditMailComponent } from './settings/edit-mail/edit-mail.component';
import { HelpComponent } from './settings/help/help.component';
import { ProfilePictureComponent } from './modals/profile-picture/profile-picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoiceHomeComponent } from './modals/choice-home/choice-home.component';

@NgModule({
  declarations: [
    HomeComponent,
    SettingsComponent,
    FeedComponent,
    RemindersComponent,
    AccountComponent,
    SelectThemeComponent,
    SelectLanguageComponent,
    LogoutComponent,
    AboutComponent,
    DeleteAccountComponent,
    EditPwdComponent,
    EditNameComponent,
    EditMailComponent,
    HelpComponent,
    ProfilePictureComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SenderRoutingModule,
    TranslateModule,
    HttpClientModule,
    ImageCropperModule
  ]
})
export class SenderModule { }
