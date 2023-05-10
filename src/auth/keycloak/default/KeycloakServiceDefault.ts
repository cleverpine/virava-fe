import Keycloak from 'keycloak-js';
import { KeycloakConfigDefault } from './KeycloakConfigDefault';
import { AuthResponse } from '../../../models/AuthResponse';
import { TokenObjectValues } from '../../../models/TokenObjectValues';
import { removeTokens, setTokens } from '../../../utils/helpers';
import { MS_CHECK_TOKEN_VALIDITY_INTERVAL, TOKEN_MIN_VALIDITY } from '../../../utils/constants';

import { AuthServiceBase } from '../../../auth/base/AuthServiceBase';

export class KeycloakServiceDefault extends AuthServiceBase<KeycloakConfigDefault> {
  private keycloak!: Keycloak;
  private updateTokenInterval!: ReturnType<typeof setInterval>;

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
        pkceMethod: 'S256',
      })
      .then(() => {
        setTokens(this.config, {
          access: this.keycloak.token,
          refresh: this.keycloak.refreshToken,
        } as TokenObjectValues);

        // Check token validity every MS_CHECK_TOKEN_VALIDITY_INTERVAL seconds
        // and if necessary, update the token.
        this.updateTokenInterval = setInterval(this.updateToken, MS_CHECK_TOKEN_VALIDITY_INTERVAL);
      });
  };

  /**
   * Refresh token if it's valid for less then TOKEN_MIN_VALIDITY seconds.
   * If it is refreshed - updates the values in `localStorage`.
   */
  private updateToken = () => {
    this.keycloak
      .updateToken(TOKEN_MIN_VALIDITY)
      .then((refreshed: boolean) => {
        if (refreshed) {
          setTokens(this.config, {
            access: this.keycloak.token,
            refresh: this.keycloak.refreshToken,
          } as TokenObjectValues);
        }
      })
      .catch((error: any) => {
        this.logout();
        throw new Error('Failed to refresh token ' + error);
      });
  }

  /**
   * Logouts user, clears the `updateTokenInterval` and removes tokens from `localStorage`
   * @param redirectUri - url to be redirected after logout
   */
  logout = async (redirectUri?: string): Promise<void> => {
    if (!this.config?.clientId || !this.config.baseUrl || !this.keycloak) {
      throw new Error('Service not initialized!');
    }

    clearInterval(this.updateTokenInterval);

    return this.keycloak.logout({ redirectUri: redirectUri }).then(() => {
      removeTokens(this.config);
    });
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
