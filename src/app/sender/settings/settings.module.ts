import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { AboutComponent } from './about/about.component';
import { EditMailComponent } from './edit-mail/edit-mail.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditPwdComponent } from './edit-pwd/edit-pwd.component';
import { HelpComponent } from './help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AutoFocusDirective } from 'src/app/common/directives/auto-focus.directive';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AboutComponent,
    ProfileComponent,
    EditMailComponent,
    EditNameComponent,
    EditPwdComponent,
    HelpComponent,
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
