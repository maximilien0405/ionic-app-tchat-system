import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderRoutingModule } from './sender-routing.module';
import { HomeSettingsComponent } from './settings/home-settings/home-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { TchatComponent } from './tchat/tchat.component';
import { RemindersComponent } from './reminders/reminders.component';
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
import { MenuComponent } from './menu/menu.component';
import { KeyboardFlyingDirective } from '../common/directives/keyboard-height.directive';
import { CreateConversationComponent } from './modals/create-conversation/create-conversation.component';
import { CreateGroupComponent } from './modals/create-group/create-group.component';
import { ProfileComponent } from './modals/profile/profile.component';

@NgModule({
  declarations: [
    SettingsComponent,
    TchatComponent,
    RemindersComponent,
    SelectThemeComponent,
    SelectLanguageComponent,
    LogoutComponent,
    DeleteAccountComponent,
    ProfilePictureComponent,
    CreateConversationComponent,
    CreateGroupComponent,
    ProfileComponent,
    HomeSettingsComponent,
    MenuComponent,
    KeyboardFlyingDirective
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
