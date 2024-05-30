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
        requiredPolicy: 'QuizSystem.QuizMaster || QuizSystem.Student'
      },
      {
        path: '/login',
        name: '::Login',
        iconClass: 'fas fa-sign-in-alt',
        order: 5,
        layout: eLayoutType.application,
        requiredPolicy: 'QuizSystem.QuizMaster'
      },
      {
        path: '/scoreboard',
        name: '::Rankliste',
        iconClass: 'fa fa-clipboard',
        order: 3,
        layout: eLayoutType.application,
        requiredPolicy: 'QuizSystem.Student'
      },
      {
        path: '/fragemanager',
        name: '::Fragemanager',
        iconClass: 'fas fa-tasks',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: 'QuizSystem.QuizMaster'
      },
      {
        path: '/quizhub',
        name: '::Quizhub',
        iconClass: 'fas fa-comment',
        order: 4,
        layout: eLayoutType.application,
        requiredPolicy: 'QuizSystem.Student'
      }
    ]);
  };
}
