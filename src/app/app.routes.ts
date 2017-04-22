import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

export const AppRouterModule = RouterModule.forRoot(ROUTES, {
  preloadingStrategy : PreloadAllModules
});
