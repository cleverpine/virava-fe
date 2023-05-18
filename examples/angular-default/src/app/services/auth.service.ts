import { Injectable } from '@angular/core';

import { KeycloakServiceDefault, KeycloakConfigDefault } from 'virava';

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
}
