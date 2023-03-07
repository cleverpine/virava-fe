export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
export const GRANT_TYPE_PASSWORD = 'password';
export const MS_FOR_ONE_SECOND: number = 1000;
export const KEY_ACCESS_TOKEN: string = 'access_token';
export const KEY_REFRESH_TOKEN: string = 'refresh_token';
export const KEY_EXPIRATION_DATE: string = 'expiration_date';
export const KEY_EXPIRATION_REFRESH: string = 'expiration_refresh';

// API
export const API_ENDPOINT_LOGOUT = '{BASE_URL}/realms/{REALM}/protocol/openid-connect/logout';
export const API_ENDPOINT_TOKEN = '{BASE_URL}/realms/{REALM}/protocol/openid-connect/token';

export const API_ENDPOINT_CHANGE_PASSWORD = '/changePassword';
export const API_ENDPOINT_REGISTER = '/register';
export const API_ENDPOINT_RESET_PASSWORD = '/resetPassword';

// Content-Type
export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_FORM_URL_ENCODED = 'application/x-www-form-urlencoded';

// Status Codes
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_CUSTOM_LOGIN_ERROR = 417;
