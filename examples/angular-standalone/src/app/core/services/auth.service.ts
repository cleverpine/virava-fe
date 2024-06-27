import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, from, of } from 'rxjs';
import {
  AuthServiceFactory,
  KeycloakConfigDefault,
  KeycloakServiceDefault,
  ServiceType,
} from 'virava';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authService!: any;

  userData: BehaviorSubject<any> | null = new BehaviorSubject(null);

  config!: KeycloakConfigDefault;

  init(baseUrl: string, clientId: string, realm: string): void {
    this.config = {
      clientId,
      baseUrl,
      realm,
    };
    this.authService = AuthServiceFactory.create(
      ServiceType.DEFAULT
    ) as KeycloakServiceDefault;
    
    this.authService.init(this.config);
  }

  login(): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return from(
        this.authService.login().then(() => {
          this.userData?.next(this.authService.keycloak.tokenParsed);
        })
      );
    }
    return of(true);
  }

  logout(): Observable<any> {
    return from(this.authService.logout(window.location.href));
  }

  updateToken() {
    return this.authService?.updateToken();
  }

  checkIfTokenHasExpired() {
    this.authService?.checkIfTokenHasExpired();
  }

  isRefreshTokenExpired() {
    return this.authService?.isRefreshTokenExpired();
  }

  getSecondsUntilTokenExpiration() {
    return this.authService?.getSecondsUntilTokenExpiration();
  }
}
