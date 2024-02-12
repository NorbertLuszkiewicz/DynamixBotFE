import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ConnectionsComponent } from './pages/connections/connections.component';
import { InformationComponent } from './pages/information/information.component';
import { RewardsComponent } from './pages/rewards/rewards.component';

export const routes: Routes = [
  {
    path: 'information',
    component: InformationComponent,
  },
  {
    path: 'connections',
    component: ConnectionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'rewards',
    component: RewardsComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'information',
  },
];
