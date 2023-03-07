export interface AuthConfigBase {
  readonly clientId: string;
  readonly baseUrl: string;
  readonly realm: string;
  readonly tokenStorageKey?: string;
  readonly refreshTokenStorageKey?: string;
  readonly expirationDateStorageKey?: string;
  readonly expirationRefreshDateStorageKey?: string;
}
