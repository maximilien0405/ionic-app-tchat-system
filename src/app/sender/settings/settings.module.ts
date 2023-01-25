import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { AboutComponent } from './about/about.component';
import { EditMailComponent } from './edit-mail/edit-mail.component';
import { EditPwdComponent } from './edit-pwd/edit-pwd.component';
import { HelpComponent } from './help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AutoFocusDirective } from 'src/app/common/directives/auto-focus.directive';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { SubscriptionComponent } from './subscription/subscription.component';


@NgModule({
  declarations: [
    AboutComponent,
    ProfileComponent,
    SecurityComponent,
    NotificationsComponent,
    EditMailComponent,
    EditPwdComponent,
    ForgotPwdComponent,
    HelpComponent,
    SubscriptionComponent,
    AutoFocusDirective
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
