import { AuthConfigBase } from "../../base/AuthConfigBase";

export interface KeycloakConfigCustom extends AuthConfigBase {
  readonly gatewayBaseUrl: string;
}
