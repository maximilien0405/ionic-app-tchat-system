import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DesignSystemComponent } from './design-system/design-system.component';

const routes: Routes = [
  { path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartModule) },
  { path: 'sender', loadChildren: () => import('./sender/sender.module').then(m => m.SenderModule) },
  { path: 'charte', component: DesignSystemComponent },
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
