import { AuthConfigBase } from "../../base/AuthConfigBase";

export interface KeycloakConfigDefault extends AuthConfigBase {
  readonly redirectUri?: string;
}
