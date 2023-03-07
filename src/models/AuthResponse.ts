export type AuthRequest = Record<string, string>;

export interface AuthResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly expires_in: number;
  readonly refresh_expires_in: number;
}
