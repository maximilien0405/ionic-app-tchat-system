import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { EditMailComponent } from './edit-mail/edit-mail.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditPwdComponent } from './edit-pwd/edit-pwd.component';
import { HelpComponent } from './help/help.component';
import { HomeSettingsComponent } from './home-settings/home-settings.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'account', component: AccountComponent },
      { path: 'edit-mail', component: EditMailComponent },
      { path: 'edit-name', component: EditNameComponent },
      { path: 'edit-pwd', component: EditPwdComponent },
      { path: 'help', component: HelpComponent },
      { path: 'home', component: HomeSettingsComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
