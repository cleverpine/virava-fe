import Keycloak from 'keycloak-js';

import jwt_decode from 'jwt-decode';

import { KeycloakConfigDefault } from './KeycloakConfigDefault';
import { AuthResponse } from '../../../models/AuthResponse';
import { TokenObjectValues } from '../../../models/TokenObjectValues';
import { removeTokens, setTokens } from '../../../utils/helpers';

import { AuthServiceBase } from '../../../auth/base/AuthServiceBase';
import { ACCESS_TOKEN_UPDATE_MIN_VALIDITY } from '../../../utils/constants';

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
      });
  };

  /**
   * Refresh token if it's valid for less then TOKEN_MIN_VALIDITY seconds.
   * If it is refreshed - updates the values in `localStorage`.
   */
  updateToken = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.keycloak
        .updateToken(ACCESS_TOKEN_UPDATE_MIN_VALIDITY)
        .then((refreshed: boolean) => {
          if (refreshed) {
            setTokens(this.config, {
              access: this.keycloak.token,
              refresh: this.keycloak.refreshToken,
            } as TokenObjectValues);
          }

          resolve(refreshed);
        })
        .catch((error: any) => {
          this.logout();
          reject(new Error('Failed to refresh token ' + error));
        });
    });
  };

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

   /**
   * @returns if the refresh token is expired
   */
   isRefreshTokenExpired = (keycloak: Keycloak): boolean => {
    // Parse and decode the refresh token
    const refreshToken = keycloak.refreshToken as string;
    const refreshTokenPayload: any = jwt_decode(refreshToken);

    // Get the expiration time of the refresh token (in seconds)
    const refreshTokenExp = refreshTokenPayload.exp;

    // Get the current time (in seconds)
    const currentTime = Math.floor(new Date().getTime() / 1000);

    // Check if the refresh token has expired
    return currentTime >= refreshTokenExp;
  };

  /**
   * Checks if the refresh token has expired and if it has, logs the user out, if it hasn't, updates the access and refresh tokens
   */
  checkIfTokenHasExpired = () => {
    if (this.isRefreshTokenExpired(this.keycloak)) {
      this.logout();
      throw new Error('Refresh token has expired!');
    } else {
      this.updateToken();
    }
  }
}
