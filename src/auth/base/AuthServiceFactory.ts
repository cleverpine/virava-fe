import { KeycloakServiceCustom } from "../keycloak/custom";
import { KeycloakServiceDefault } from "../keycloak/default";
import { AuthConfigBase } from "./AuthConfigBase";
import { AuthServiceBase } from "./AuthServiceBase";
import { ServiceType } from "./ServiceType";

export class AuthServiceFactory {
  static create<T extends AuthConfigBase>(serviceType: ServiceType): AuthServiceBase<T> {
    let service: unknown;

    switch (serviceType) {
      case ServiceType.CUSTOM:
        service = new KeycloakServiceCustom();
        break;
      case ServiceType.DEFAULT:
        service = new KeycloakServiceDefault();
        break;
      default:
        service = new KeycloakServiceDefault();
    }

    return service as AuthServiceBase<T>;
  }
}