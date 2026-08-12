import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard) },

  { path: 'plants', loadComponent: () => import('./pages/plants/plants').then((m) => m.Plants) },

  {
    path: 'plants/:id',
    loadComponent: () => import('./pages/plants/plant-detail/plant-detail').then((m) => m.PlantDetail),
  },

  { path: 'devices', loadComponent: () => import('./pages/devices/devices').then((m) => m.Devices) },

  {
    path: 'devices/:sn',
    loadComponent: () => import('./pages/devices/device-detail/device-detail').then((m) => m.DeviceDetail),
  },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
