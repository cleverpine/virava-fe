import Keycloak from 'keycloak-js';
import { KeycloakConfigDefault } from './KeycloakConfigDefault';
import { AuthResponse } from '../../../models/AuthResponse';
import { TokenObjectValues } from '../../../models/TokenObjectValues';
import { setTokens } from '../../../utils/helpers';

import { AuthServiceBase } from '../../../auth/base/AuthServiceBase';

export class KeycloakServiceDefault extends AuthServiceBase<KeycloakConfigDefault> {
  private keycloak!: Keycloak;

  /**
   * Initialises the auth service configuration
   * @param configuration
   */
  init = async (configuration: KeycloakConfigDefault): Promise<void> => {
    this.config = configuration;

    this.keycloak = new Keycloak({
      realm: this.config.realm,
      url: this.config.baseUrl,
      clientId: this.config.clientId,
    });
  };

  /**
   * Redirects the user to the keycloak login page.
   */
  login = async (): Promise<AuthResponse | void> => {
    if (!this.config?.clientId || !this.config.baseUrl || !this.keycloak) {
      throw new Error('Service not initialized!');
    }
    return this.keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: this.config.redirectUri,
        pkceMethod: 'S256',
      })
      .then(() => {
        setTokens(this.config, {
          access: this.keycloak.token,
          refresh: this.keycloak.refreshToken,
        } as TokenObjectValues);
      });
  };

  /**
   * Logouts user and remove tokens from `localStorage`
   * @param redirectUri - url to be redirected after logout
   */
  logout = async (redirectUri?: string): Promise<void> => {
    if (!this.config?.clientId || !this.config.baseUrl || !this.keycloak) {
      throw new Error('Service not initialized!');
    }

    return this.keycloak.logout({ redirectUri: redirectUri });
  };

  /**
   * Redirects the user to the register page
   */
  register = async (): Promise<void> => {
    if (!this.config?.clientId || !this.config.baseUrl || !this.keycloak) {
      throw new Error('Service not initialized!');
    }
    return this.keycloak.register();
  };

  /**
   * @returns if the user is authenticated
   */
  isAuthenticated = (): boolean => {
    if (!this.keycloak) {
      throw new Error('Service not initialized!');
    }
    return !!this.keycloak.authenticated;
  };
}
