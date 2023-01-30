import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditMailComponent } from './edit-mail/edit-mail.component';
import { EditPwdComponent } from './edit-pwd/edit-pwd.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { HelpComponent } from './help/help.component';
import { HomeSettingsComponent } from './home-settings/home-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SecurityComponent } from './security/security.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'edit-mail', component: EditMailComponent },
  { path: 'edit-pwd', component: EditPwdComponent },
  { path: 'forgot-pwd', component: ForgotPwdComponent },
  { path: 'help', component: HelpComponent },
  { path: 'home', component: HomeSettingsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
