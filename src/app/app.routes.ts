import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'example',
        pathMatch: 'full',
      },
      {
        path: 'example',
        loadChildren: () =>
          import('./features/example/example.routes').then((m) => m.EXAMPLE_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
