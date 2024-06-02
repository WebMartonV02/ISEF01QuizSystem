import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Quizmunity',
    logoUrl: 'assets/images/Logo_positiv.png',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44345/',
    redirectUri: baseUrl,
    clientId: 'ISEF01QuizSystem_App',
    responseType: 'code',
    scope: 'offline_access ISEF01QuizSystem',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44345',
      rootNamespace: 'ISEF01QuizSystem',
    },
  },
} as Environment;
