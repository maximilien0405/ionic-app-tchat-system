import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WhoAreYouComponent } from './who-are-you/who-are-you.component';

const routes: Routes = [
  { path: '', component: StartComponent, children: [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'who-are-you', component: WhoAreYouComponent },
    { path: '**', redirectTo: 'who-are-you', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
