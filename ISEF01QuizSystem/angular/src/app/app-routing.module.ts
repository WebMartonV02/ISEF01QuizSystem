import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
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
    path: 'quizes/:id',
    loadChildren: () =>
      import('./quizes/quizes.module').then(m => m.QuizesModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m. LoginModule),
  },
  {
    path: 'fragenseite/:id',
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
  {
    path: 'quizhub',
    loadChildren: () =>
      import('./quizhub/quizhub.module').then(m => m. QuizhubModule),
  },
  {
    path: 'scoreboard',
    loadChildren: () =>
      import('./scoreboard/scoreboard.module').then(m => m. ScoreboardModule),
  },
  {
    path: 'quizuebersicht',
    loadChildren: () =>
      import('./quizuebersicht/quizuebersicht.module').then(m => m. QuizuebersichtModule),
  },
  {
    path: 'ergebnis/:id',
    loadChildren: () =>
      import('./ergebnis/ergebnis.module').then(m => m. ErgebnisModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
