import { AuthResponse } from "./../../models/AuthResponse";
import { AuthConfigBase } from "./AuthConfigBase";

export interface IAuthService<T extends AuthConfigBase> {
  readonly config: T | null;
  init: (config: T) => Promise<void> | void;
  login: (username?: string, password?: string) => Promise<AuthResponse | void>;
  logout: () => Promise<any>;
  changePassword?: (email: string, currentPassword: string, newPassword: string, confirmPassword: string) => Promise<AuthResponse> | void;
  resetPassword?: (email: string) => Promise<AuthResponse> | void;
  register?: (email?: string, password?: string, confirmPassword?: string) => Promise<AuthResponse | void>;
}