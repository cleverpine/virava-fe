export interface ICallbackFunctions {
  callbackOnUnauthorized?: () => void;
  callbackOnForbidden?: () => void;
  callbackOnCustomLoginError?: () => void;
}
