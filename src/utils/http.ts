import formurlencoded from 'form-urlencoded';

import { ContentType } from '../models/ContentType';

import { CONTENT_TYPE_JSON } from './constants';

const http = async <T>(endpoint: string, config: RequestInit, contentType: ContentType): Promise<T> => {
  const requestConfig = {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': contentType
    }
  }

  const request = new Request(endpoint, requestConfig as RequestInit);
  const response = await fetch(request);

  if (!response.ok) {
    const status = response.status;
    const jsonResponse = await response.json();

    // When accessing Keycloak directly (e.g login/logout requests)
    // the error response contains `error` and `error_description` as strings
    // that is why we throw custom error object with the same format as the gateway's
    if (typeof jsonResponse.error === 'string') {
      throw {
        status,
        detail: jsonResponse.error_description
      }
    }

    throw jsonResponse.error;
  }

  const text = await response.text();

  return text.length ? JSON.parse(text) : {};
};

export const post = async <T, U>(endpoint: string, body: T, contentType: ContentType): Promise<U> => {
  const requestBody = contentType === CONTENT_TYPE_JSON
    ? JSON.stringify(body)
    : formurlencoded(body);

  const init = { method: 'post', body: requestBody };
  return await http<U>(endpoint, init, contentType);
};
