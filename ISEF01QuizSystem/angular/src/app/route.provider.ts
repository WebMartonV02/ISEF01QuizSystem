import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/login',
        name: '::Login',
        iconClass: 'fas fa-home',
        order: 4,
        layout: eLayoutType.application,
      },
      {
        path: '/scoreboard',
        name: '::Rankliste',
        iconClass: 'fas fa-home',
        order: 5,
        layout: eLayoutType.application,
      },
      {
        path: '/konfiguration',
        name: '::konfiguration',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/fragemanager',
        name: '::fragemanager',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/fragenedit',
        name: '::fragenedit',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/quizhub',
        name: '::quizuhub',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/scoreboard',
        name: '::scoreboard',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/ergebnis',
        name: '::ergebnis',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
    ]);
  };
}
