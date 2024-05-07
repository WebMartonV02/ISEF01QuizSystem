import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  {
    path: 'start',
    loadChildren: () =>
      import('./start/start.module').then(m => m.StartModule),
  },
  {
    path: 'kursauswahl',
    loadChildren: () =>
      import('./kursauswahl/kursauswahl.module').then(m => m.KursauswahlModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m. LoginModule),
  },
  {
    path: 'fragenseite',
    loadChildren: () =>
      import('./fragenseite/fragenseite.module').then(m => m. FragenseiteModule),
  },
  {
    path: 'konfiguration',
    loadChildren: () =>
      import('./konfiguration/konfiguration.module').then(m => m. KonfigurationModule),
  },
  {
    path: 'fragemanager',
    loadChildren: () =>
      import('./fragemanager/fragemanager.module').then(m => m. FragemanagerModule),
  },
  {
    path: 'fragenedit',
    loadChildren: () =>
      import('./fragenedit/fragenedit.module').then(m => m. FrageneditModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
