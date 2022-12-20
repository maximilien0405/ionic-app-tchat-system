import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { RemindersComponent } from './reminders/reminders.component';
import { SenderComponent } from './sender.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {
    path: '', component: SenderComponent, children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      //{ path: 'home', component: HomeComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'feed', component: FeedComponent },
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
