import { Routes } from '@angular/router';

import { CampaignsViewComponent } from './components/campaigns-view/campaigns-view';
import { ChildrenViewComponent } from './components/children-view/children-view';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view';
import { WalletViewComponent } from './components/wallet-view/wallet-view';

export const routes: Routes = [
  { path: '', redirectTo: 'resumo', pathMatch: 'full' },
  { path: 'resumo', component: DashboardViewComponent },
  { path: 'criancas', component: ChildrenViewComponent },
  { path: 'carteira', component: WalletViewComponent },
  { path: 'campanhas', component: CampaignsViewComponent },
  { path: '**', redirectTo: 'resumo' },
];
