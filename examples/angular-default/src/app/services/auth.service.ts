import { Injectable } from '@angular/core';
import { AuthServiceFactory, ServiceType, KeycloakServiceDefault, KeycloakConfigDefault } from 'virava';
console.log({ AuthServiceFactory, ServiceType, KeycloakServiceDefault });


const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  viravaService!: KeycloakServiceDefault | null;
  authConfig: KeycloakConfigDefault = {
    clientId: 'web',
    baseUrl: 'https://virava-keycloak.thepineslab.net/auth',
    realm: 'master',
  };

  init() {
    this.viravaService = new KeycloakServiceDefault();
    this.viravaService?.init(this.authConfig);
  }

  login() {
    return this.viravaService?.login();
  }

  logout() {
    this.viravaService?.logout();
  }

  updateToken() {
    return this.viravaService?.updateToken();
  }

  checkIfTokenHasExpired() {
    this.viravaService?.checkIfTokenHasExpired();
  }

  checkIfUserIsAuthenticated() {
    return this.viravaService?.isAuthenticated();
  }
}
