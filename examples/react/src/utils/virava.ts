import {
  KeycloakConfigCustom,
  KeycloakServiceCustom,
  AuthServiceFactory,
  ServiceType,
} from 'virava';

export const authConfig: KeycloakConfigCustom = {
  clientId: 'web',
  baseUrl: 'https://virava-keycloak.thepineslab.net/auth',
  realm: 'master',
  gatewayBaseUrl: 'https://virava-playground.thepineslab.net/gateway/api',
};

export const cpAuthService = AuthServiceFactory.create(
  ServiceType.CUSTOM
) as KeycloakServiceCustom;
