import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

import { KeycloakConfigDefault } from './KeycloakConfigDefault';
import { AuthResponse } from '../../../models/AuthResponse';
import { TokenObjectValues } from '../../../models/TokenObjectValues';
import { removeTokens, setTokens } from '../../../utils/helpers';

import { AuthServiceBase } from '../../../auth/base/AuthServiceBase';
import { ACCESS_TOKEN_UPDATE_MIN_VALIDITY } from '../../../utils/constants';

export class KeycloakServiceDefault extends AuthServiceBase<KeycloakConfigDefault> {
  private keycloak!: Keycloak;
  private initOptions?: KeycloakInitOptions;

  /**
   * Initialises the auth service configuration
   * @param configuration
   */
  init = async (configuration: KeycloakConfigDefault, initOptions?: KeycloakInitOptions): Promise<void> => {
    this.config = configuration;
    this.initOptions = initOptions;

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
        ...this.initOptions
      })
      .then(() => {
        setTokens(this.config, {
          access: this.keycloak.token,
          refresh: this.keycloak.refreshToken,
        } as TokenObjectValues);
      });
  };

  /**
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
   * Logouts user and removes tokens from `localStorage`
   * @param redirectUri - url to be redirected after logout
   */
  logout = async (redirectUri?: string): Promise<void> => {
    if (!this.config?.clientId || !this.config.baseUrl || !this.keycloak) {
      throw new Error('Service not initialized!');
    }

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
   * Checks if the refresh token has expired and if it has, logs the user out, if it hasn't, updates the access and refresh tokens
   */
  checkIfTokenHasExpired = () => {
    if (this.isRefreshTokenExpired()) {
      this.logout();
      throw new Error('Refresh token has expired!');
    } else {
      this.updateToken();
    }
  }

  /**
  * @returns if the refresh token is expired
  */
  isRefreshTokenExpired = (): boolean => {
    // Get the expiration time of the refresh token (in seconds)
    const refreshTokenExp = this.keycloak.refreshTokenParsed!.exp;

    // Get the current time (in seconds)
    const currentTime = Math.floor(new Date().getTime() / 1000);

    // Check if the refresh token has expired
    return currentTime >= refreshTokenExp!;
  };

  /**
   * @returns the number of seconds until the refresh token expires
   */
  getSecondsUntilTokenExpiration = (): number => {
    const refreshTokenExpiryTime = this.keycloak.refreshTokenParsed!.exp;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const secondsUntilExpiry = refreshTokenExpiryTime! - currentTimestamp;

    return secondsUntilExpiry;
  };

    /**
   * Checks if the user has a specific role in the realm.
   * @param roleName The name of the role to check for.
   * @returns true if the user has the role, false otherwise.
   */
  hasRealmRole = (roleName: string): boolean => {
    if (!this.keycloak.authenticated) {
      throw new Error('User is not authenticated!');
    }

    return this.keycloak.hasRealmRole(roleName);
  };

    /**
   * Checks if the user has a specific role for a resource or client.
   * @param roleName The name of the role to check for.
   * @param resource The clientId of the resource. If not provided, uses the clientId from the configuration.
   * @returns true if the user has the role for the resource, false otherwise.
   */
  hasResourceRole = (roleName: string, resource?: string): boolean => {
    if (!this.keycloak.authenticated) {
      throw new Error('User is not authenticated!');
    }
    return this.keycloak.hasResourceRole(roleName, resource || this.config.clientId);
  };
}
