import { AuthConfigBase } from './AuthConfigBase';
import { AuthResponse } from '../../models/AuthResponse';

import {
  KEY_EXPIRATION_DATE,
  KEY_EXPIRATION_REFRESH,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_CUSTOM_LOGIN_ERROR,
} from '../../utils/constants';
import { getItem } from '../../utils/helpers';
import { IAuthService } from '../../auth/base/IAuthService';
import { ICallbackFunctions } from '../../models/ICallbackFunctions';

export abstract class AuthServiceBase<T extends AuthConfigBase> implements IAuthService<T> {
  config!: T;

  abstract init(confing: T): Promise<void> | void;
  abstract login(username?: string, password?: string): Promise<AuthResponse | void>;
  abstract register(email?: string, password?: string, confirmPassword?: string):Promise<AuthResponse | void>;
  abstract logout(): Promise<void>;

  /**
   * This method handles authentification statuses
   * @param status - Number
   * @param callBackFunctions - callback function
   */
  handleAuthStatuses = (status: number, callBackFunctions: ICallbackFunctions): void => {
    switch (status) {
      case STATUS_UNAUTHORIZED:
        callBackFunctions.callbackOnUnauthorized && callBackFunctions.callbackOnUnauthorized();
        break;
      case STATUS_FORBIDDEN:
        callBackFunctions.callbackOnForbidden && callBackFunctions.callbackOnForbidden();
        break;
      case STATUS_CUSTOM_LOGIN_ERROR:
        callBackFunctions.callbackOnCustomLoginError && callBackFunctions.callbackOnCustomLoginError();
        break;
      default:
        return;
    }
  };

  /**
   * This method checks if token is expired based on the `expirationDate` set in `localStorage`
   * @returns A boolean `isExpired`
   */
  isTokenExpired = (isRefresh?: boolean): boolean => {
    let isExpired = true;

    const expirationDate = isRefresh
      ? getItem(this.config?.expirationRefreshDateStorageKey || KEY_EXPIRATION_REFRESH)
      : getItem(this.config?.expirationDateStorageKey || KEY_EXPIRATION_DATE);

    if (expirationDate) {
      const currentDate = new Date().getTime();

      isExpired = currentDate > Number(expirationDate);
    }

    return isExpired;
  };
}
