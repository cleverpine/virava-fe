# Virava

Virava is a lightweight service designed to handle authentication inside a web application.



## Dependencies

- [Keycloak](https://www.npmjs.com/package/keycloak-js)
- [Typescript](https://www.npmjs.com/package/typescript)
- [formurlencoded](https://www.npmjs.com/package/form-urlencoded)



# Getting started with Virava

This guide explains how to set up your project to begin using Virava. It includes information on prerequisites, installing and configuring Virava.


## 1. Install Virava

To install Virava you will need to have npm previously installed and then type in a terminal:

```
npm install virava
```
> This will add project dependencies to  `package.json`.



## 2. Usage

Virava currently supports 2 ways of handling authentication depending on the API used.
One uses `Keycloak` and its default flow. The other - a custom Backend REST API.

All of them share similar approach. It is recommended to use the factory class to instantiate the Virava.
Depending on the flow you are using you should cast the service instantiated so you can get additional/correct methods.

- `Keycloak` approach:

```js
import { AuthServiceFactory, ServiceType, KeycloakServiceDefault } from 'virava';

const authService = AuthServiceFactory.create(ServiceType.DEFAULT) as KeycloakServiceDefault;
```

> Then you will need to add the configuration and the initOptions for the service (again depending on the flow). The initOptions is an optional parameter.

```js
import { KeycloakConfigDefault, KeycloakInitOptions } from 'virava';

const config: KeycloakConfigDefault = {
  clientId:'',
  baseUrl: '',
  realm: '',
  tokenStorageKey: '', //optional
  refreshTokenStorageKey: '', //optional
  expirationDateStorageKey: '', //optional
  expirationRefreshDateStorageKey: '', //optional
  redirectUri: '' //optional
};

const initOptions: KeycloakInitOptions = {
  // Add your desired init options here
};

authService.init(config, initOptions);
```

- Custom approach:

```js
import { AuthServiceFactory, ServiceType, KeycloakServiceCustom } from 'virava';

const authService = AuthServiceFactory.create(ServiceType.CUSTOM) as KeycloakServiceCustom;
```

> Then you will need to add the configuration for the service (again depending on the flow).

```js
import { KeycloakConfigCustom } from 'virava';

const config: KeycloakConfigCustom = {
  clientId: '',
  baseUrl: '',
  realm: '',
  tokenStorageKey: '', //optional
  refreshTokenStorageKey: '', //optional
  expirationDateStorageKey: '', //optional
  expirationRefreshDateStorageKey: '', //optional
  gatewayBaseUrl: ''
};

authService.init(config);
```


## 3. Start using Virava

To start using Virava simply import your instance of `authService` and trigger some of its methods:

- Keycloak Default pages approach:

```
/**
 * Initializes the auth service configuration. It returns Promise.
 */
authService.init(configuration, initOptions);

/**
 * Redirects the user to the keycloak login page. It returns Promise.
 */
authService.login();

/**
 * Redirects the user to the register page. It returns Promise.
 */
authService.register(email, password, confirmPassword);

/**
 * Checks if the user is authenticated, returning a boolean.
 */
authService.isAuthenticated();

/**
 * Checks if the refresh token has expired, returning a boolean.
 */
authService.isRefreshTokenExpired();

/**
 * Updates the authentication tokens in localStorage upon successful refresh. It returns Promise.
 */
authService.updateToken()

/**
 * Checks if the user has a specific role for a resource or client, returning a boolean.
 */
authService.hasResourceRole(roleName, resource);

/**
 * Checks if the user has a specific role in the realm, returning a boolean.
 */
authService.hasRealmRole(roleName);

/**
 * Logouts user and remove tokens from `localStorage`. It returns Promise.
 */
authService.logout();
```


- Keycloak Custom pages approach:

```
/**
 * Initializes the auth service configuration.
 */
authService.init(configuration);

/**
 * This method is designed to work with Direct Access Grant flow of OAuth. It returns Promise.
 */
authService.login(username, password);

/**
 * This method registers the user. It returns Promise.
 */
authService.register(email, password, confirmPassword);

/**
 * This method resets user's password. It returns Promise.
 */
authService.resetPassword(email);

/**
 * This method changes the user's password. It returns Promise.
 */
authService.changePassword(email, currentPassword, newPassword, confirmPassword);

/**
 * This method refreshes the token and sets the new ones in `localStorage`. It returns Promise.
 */
authService.refreshToken();

/**
 * Logouts user and remove tokens from `localStorage`. It returns Promise.
 */
authService.logout();
```


## 4. Test your application


Run your local dev server:

- in React:

```
npm start
```

- in Angular
```
ng serve
```

## Examples


### Angular using the default flow (Keycloak)

**Location:** `examples/angular-default`

### Angular using the custom flow

**Location:** `examples/angular`

### React using the custom flow

**Location:** `examples/react`