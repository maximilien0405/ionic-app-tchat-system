import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TchatComponent } from './tchat/tchat.component';
import { MenuComponent } from './menu/menu.component';
import { RemindersComponent } from './reminders/reminders.component';
import { SenderComponent } from './sender.component';

const routes: Routes = [
  {
    path: '', component: SenderComponent, children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'tchat/:id', component: TchatComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'reminders', component: RemindersComponent },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SenderRoutingModule { }
