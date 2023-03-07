import { AuthConfigBase } from '../auth/base/AuthConfigBase';
import { StringReplaceParts } from '../models/StringReplace';
import { TokenObjectValues } from '../models/TokenObjectValues';

import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN, KEY_EXPIRATION_DATE, KEY_EXPIRATION_REFRESH } from './constants';

// String
export const stringReplace = (string: string, parts: StringReplaceParts[]) => {
  let newString = string.slice();

  parts.forEach(el => {
    newString = newString.replace(el.key, el.value);
  });

  return newString;
};

// Local Storage
const getTokensKeys = (config: AuthConfigBase) => ({
  access: config.tokenStorageKey || KEY_ACCESS_TOKEN,
  refresh: config.refreshTokenStorageKey || KEY_REFRESH_TOKEN,
  expiration_date: config.expirationDateStorageKey || KEY_EXPIRATION_DATE,
  expiration_refresh: config.expirationRefreshDateStorageKey || KEY_EXPIRATION_REFRESH
});

// Save the access token and refresh token in the Local Storage.
export const setTokens = (config: AuthConfigBase, values: TokenObjectValues) => {
  const keys = getTokensKeys(config);
  const { access, refresh, expiration_date, expiration_refresh } = values;

  try {
    access  && localStorage.setItem(keys.access, access);
    refresh && localStorage.setItem(keys.refresh, refresh);
    expiration_date && localStorage.setItem(keys.expiration_date, expiration_date);
    expiration_refresh && localStorage.setItem(keys.expiration_refresh, expiration_refresh);
  } catch {
    throw new Error('Error setting tokens in localStorage');
  }
}

// Remove the access token and refresh token from Local Storage.
export const removeTokens = (config: AuthConfigBase) => {
  const keys = getTokensKeys(config);

  try {
    localStorage.removeItem(keys.access);
    localStorage.removeItem(keys.refresh);
    localStorage.removeItem(keys.expiration_date);
    localStorage.removeItem(keys.expiration_refresh);
  } catch {
    throw new Error('Error removing tokens from localStorage');
  }
}

// Gets item from Local storage by given key
export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);

    return item;
  } catch {
    throw new Error(`Error getting item with key: ${key} from localStorage`);
  }
}
