import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

export const DashboardRouterModule = RouterModule.forChild(ROUTES);
