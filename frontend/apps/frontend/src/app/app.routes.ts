import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'apply',
    loadComponent: () =>
      import('@frontend/feature-loan-form').then((m) => m.FeatureLoanForm),
  },
  {
    path: 'applications/:id',
    loadComponent: () =>
      import('@frontend/feature-loan-dashboard').then(
        (m) => m.FeatureLoanDashboard,
      ),
  },
  { path: '**', redirectTo: '' },
];
