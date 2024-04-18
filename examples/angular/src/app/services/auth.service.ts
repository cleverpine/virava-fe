import { Injectable } from '@angular/core';
import { AuthServiceFactory, KeycloakConfigCustom, KeycloakServiceCustom, ServiceType } from 'virava';

const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cpAuthService: KeycloakServiceCustom | null = null;
  authConfig: KeycloakConfigCustom = {
    clientId: 'web',
    baseUrl: 'https://virava-keycloak.thepineslab.net/auth',
    realm: 'master',
    gatewayBaseUrl: 'https://virava-playground.thepineslab.net/gateway/api',
  };

  init() {
    this.cpAuthService = AuthServiceFactory.create(ServiceType.CUSTOM) as KeycloakServiceCustom;
    this.cpAuthService.init(this.authConfig);
  }

  reset(email: string) {
    return this.cpAuthService?.resetPassword(email);
  }

  changePassword(email: string, currentPass: string, newPass: string, confirmPass: string) {
    return this.cpAuthService?.changePassword(email, currentPass, newPass, confirmPass);
  }

  login(email: string, pass: string) {
    return this.cpAuthService?.login(email, pass);
  }

  logout() {
    return this.cpAuthService?.logout();
  }

  resetPassword(email: string) {
    return this.cpAuthService?.resetPassword(email);
  }

  isLoggedIn() {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
