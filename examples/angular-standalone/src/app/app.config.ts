import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// import { ApiConfiguration } from '@openapi/api-configuration';

import { routes } from './app.routes';
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { AppConfigService } from "./core/services/app-config.service";
import { AuthService } from "./core/services/auth.service";

const initializeApp = (
  appConfigService: AppConfigService,
  // apiConfiguration: ApiConfiguration,
  authService: AuthService,
) => {
  return async () => {
    await appConfigService.loadConfig();
    // apiConfiguration.rootUrl = appConfigService.getBasePath();
    const keycloakUrl = appConfigService.getSsoServerUrl();
    const keycloakRealm = appConfigService.getSsoServerRealm();
    const keycloakClientId = appConfigService.getSsoServerClientId();

    authService.init(keycloakUrl, keycloakClientId, keycloakRealm);
    authService.login();
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService, AuthService],
      multi: true,
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
