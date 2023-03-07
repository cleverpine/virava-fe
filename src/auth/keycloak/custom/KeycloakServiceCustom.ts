import { KeycloakConfigCustom } from "./KeycloakConfigCustom";
import { AuthRequest, AuthResponse } from "../../../models/AuthResponse";
import { TokenObjectValues } from "../../../models/TokenObjectValues";
import { API_ENDPOINT_CHANGE_PASSWORD, API_ENDPOINT_LOGOUT, API_ENDPOINT_REGISTER, API_ENDPOINT_RESET_PASSWORD, API_ENDPOINT_TOKEN, CONTENT_TYPE_FORM_URL_ENCODED, CONTENT_TYPE_JSON, GRANT_TYPE_PASSWORD, GRANT_TYPE_REFRESH_TOKEN, KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN, MS_FOR_ONE_SECOND } from "../../../utils/constants";
import { getItem, removeTokens, setTokens, stringReplace } from "../../../utils/helpers";
import { post } from "../../../utils/http";
import { AuthServiceBase } from "../../base/AuthServiceBase";

export class KeycloakServiceCustom extends AuthServiceBase<KeycloakConfigCustom> {

  private endpointToken: string = '';
  private endpointLogout: string = '';
  private endpointRegister: string = '';
  private endpointResetPassword: string = '';
  private endpointChangePassword: string = '';

  /**
   * Initialises the auth service configuration
   * @param configuration 
   */
  init(configuration: KeycloakConfigCustom) {
    this.config = configuration;
    this.endpointToken = stringReplace(API_ENDPOINT_TOKEN, [
      { key: '{BASE_URL}', value: this.config.baseUrl },
      { key: '{REALM}', value: this.config.realm },
    ]);
    this.endpointLogout = stringReplace(API_ENDPOINT_LOGOUT, [
      { key: '{BASE_URL}', value: this.config.baseUrl },
      { key: '{REALM}', value: this.config.realm },
    ]);
    this.endpointRegister = `${this.config.gatewayBaseUrl}${API_ENDPOINT_REGISTER}`;
    this.endpointResetPassword = `${this.config.gatewayBaseUrl}${API_ENDPOINT_RESET_PASSWORD}`;
    this.endpointChangePassword = `${this.config.gatewayBaseUrl}${API_ENDPOINT_CHANGE_PASSWORD}`;
  }

  /**
   * Registers the user
   * @param email 
   * @param password 
   * @param confirmPassword 
   * @returns Promise after the user is registered
   */
  register = async (email: string, password: string, confirmPassword: string): Promise<AuthResponse> => {
    if (!this.config?.gatewayBaseUrl) {
      throw new Error('Service not initialized!');
    }

    if (!email || !password || !confirmPassword) {
      throw new Error('Credentials not supplied!');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords don\'t match!');
    }

    const body = {
      email,
      password,
      confirmPassword
    };

    try {
      const data: AuthResponse = await post<AuthRequest, AuthResponse>(this.endpointRegister, body, CONTENT_TYPE_JSON);

      return data;
    } catch (e: any) {
      throw e;
    }
  };

  /**
   * Resets user's password
   * @param email 
   * @returns Promise after user password reset
   */
  resetPassword = async (email: string): Promise<AuthResponse> => {
    if (!this.config?.gatewayBaseUrl) {
      throw new Error('Service not initialized!');
    }

    if (!email) {
      throw new Error('Email for reset password not supplied!');
    }

    const body = {
      email
    };

    try {
      const data: AuthResponse = await post<AuthRequest, AuthResponse>(this.endpointResetPassword, body, CONTENT_TYPE_JSON);

      return data;
    } catch (e: any) {
      throw e;
    }
  }


  /**
   * Changes the user's password
   * @param email 
   * @param currentPassword 
   * @param newPassword 
   * @param confirmPassword 
   * @returns Promise after the user has changed his password
   */
  changePassword = async (email: string, currentPassword: string, newPassword: string, confirmPassword: string): Promise<AuthResponse> => {
    if (!this.config?.gatewayBaseUrl) {
      throw new Error('Service not initialized!');
    }

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      throw new Error('Credentials not supplied!');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Passwords don\'t match!');
    }

    const body = {
      email,
      currentPassword,
      newPassword,
      confirmPassword
    };

    try {
      const data: AuthResponse = await post<AuthRequest, AuthResponse>(this.endpointChangePassword, body, CONTENT_TYPE_JSON);

      return data;
    } catch (e: any) {
      throw e;
    }
  }

  /**
   * This method is designed to work with Direct Access Grant flow of OAuth.
   * @param username
   * @param password
   */
  login = async (username: string, password: string): Promise<AuthResponse | void> => {
    if (!this.config?.clientId || !this.config.baseUrl) {
      throw new Error('Service not initialized!');
    }

    if (!username || !password) {
      throw new Error('Credentials not supplied!');
    }

    const body = {
      username,
      password,
      client_id: this.config.clientId,
      grant_type: GRANT_TYPE_PASSWORD
    };

    try {
      const data: AuthResponse = await post<AuthRequest, AuthResponse>(this.endpointToken, body, CONTENT_TYPE_FORM_URL_ENCODED);
      const expirationDate = new Date().getTime() + data.expires_in * MS_FOR_ONE_SECOND;
      const expirationRefresh = new Date().getTime() + data.refresh_expires_in * MS_FOR_ONE_SECOND;

      setTokens(this.config, {
        access: data[KEY_ACCESS_TOKEN as keyof AuthResponse],
        refresh: data[KEY_REFRESH_TOKEN as keyof AuthResponse],
        expiration_date: expirationDate.toString(),
        expiration_refresh: expirationRefresh.toString()
      } as TokenObjectValues);

      return data;
    } catch (e: any) {
      throw e;
    }
  }

  /**
   * Logouts user and remove tokens from `localStorage`
   */
  logout = async (): Promise<void> => {
    if (!this.config?.clientId || !this.config.baseUrl) {
      throw new Error('Service not initialized!');
    }

    if (this.isTokenExpired(true)) {
      removeTokens(this.config as KeycloakConfigCustom);
      return;
    }

    try {
      const refreshTokenValue = getItem(this.config?.refreshTokenStorageKey || KEY_REFRESH_TOKEN);
      const body = {
        client_id: this.config.clientId,
        refresh_token: refreshTokenValue
      };

      return post(this.endpointLogout, body, CONTENT_TYPE_FORM_URL_ENCODED).then(() => {
        removeTokens(this.config as KeycloakConfigCustom);
      });
    } catch (e: any) {
      throw e;
    }
  }


  /**
   * This method refreshes the token and sets the new ones in `localStorage`
   */
  refreshToken = async (): Promise<AuthResponse | void> => {
    if (!this.config?.clientId || !this.config?.baseUrl) {
      throw new Error('Service not initialized!');
    }

    if (this.isTokenExpired(true)) {
      this.logout();
      return;
    }

    const refreshTokenValue = getItem(this.config?.refreshTokenStorageKey || KEY_REFRESH_TOKEN) || '';
    const body = {
      client_id: this.config.clientId,
      refresh_token: refreshTokenValue,
      grant_type: GRANT_TYPE_REFRESH_TOKEN
    };

    try {
      const data: AuthResponse = await post<AuthRequest, AuthResponse>(this.endpointToken, body, CONTENT_TYPE_FORM_URL_ENCODED);
      const expirationDate = new Date().getTime() + data.expires_in * MS_FOR_ONE_SECOND;
      const expirationRefresh = new Date().getTime() + data.refresh_expires_in * MS_FOR_ONE_SECOND;

      setTokens(this.config, {
        access: data[KEY_ACCESS_TOKEN as keyof AuthResponse],
        refresh: data[KEY_REFRESH_TOKEN as keyof AuthResponse],
        expiration_date: expirationDate.toString(),
        expiration_refresh: expirationRefresh.toString()
      } as TokenObjectValues);

      return data;
    } catch (e: any) {
      throw e;
    }
  }
}
