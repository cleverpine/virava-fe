import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// import { ApiConfiguration } from '@openapi/api-configuration';

import { firstValueFrom } from "rxjs";
import { routes } from './app.routes';
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { AppConfigService } from "./core/services/app-config.service";
import { AuthService } from "./core/services/auth.service";

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const initializeApp = (
  appConfigService: AppConfigService,
  // apiConfiguration: ApiConfiguration,
  authService: AuthService,
  translate: TranslateService
) => {
  return async () => {
    translate.setDefaultLang('en');
    await firstValueFrom(translate.use('en'));

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
      deps: [AppConfigService, AuthService, TranslateService],
      multi: true,
    },
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      }),
    )
  ],
};
