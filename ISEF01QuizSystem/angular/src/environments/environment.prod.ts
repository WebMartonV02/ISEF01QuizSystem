import { Environment } from '@abp/ng.core';

const baseUrl = 'https://quizmunity.com';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Quizmunity',
    logoUrl: 'assets/images/Logo_positiv.png',
  },
  oAuthConfig: {
    issuer: 'https://quizmunity.com/',
    redirectUri: baseUrl,
    clientId: 'ISEF01QuizSystem_App',
    responseType: 'code',
    scope: 'offline_access ISEF01QuizSystem',
    requireHttps: false
  },
  apis: {
    default: {
      url: 'https://quizmunity.com',
      rootNamespace: 'ISEF01QuizSystem',
    },
  },
} as Environment;
