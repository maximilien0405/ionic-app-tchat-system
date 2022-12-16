import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { EditMailComponent } from './edit-mail/edit-mail.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditPwdComponent } from './edit-pwd/edit-pwd.component';
import { HelpComponent } from './help/help.component';
import { HomeSettingsComponent } from './home-settings/home-settings.component';
import { LogoutComponent } from '../modals/logout/logout.component';
import { SelectLanguageComponent } from '../modals/select-language/select-language.component';
import { SelectThemeComponent } from '../modals/select-theme/select-theme.component';
import { ProfilePictureComponent } from '../modals/profile-picture/profile-picture.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AboutComponent,
    AccountComponent,
    EditMailComponent,
    EditNameComponent,
    EditPwdComponent,
    HelpComponent,
    HomeSettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    ImageCropperModule,
    IonicModule.forRoot({})
  ]
})
export class SettingsModule { }