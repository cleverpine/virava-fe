import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthService } from "../services/auth.service";
import { LocalStorageService } from "../services/local-storage.service";

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const localStorageService = inject(LocalStorageService);
  const authService = inject(AuthService);

  const token = localStorageService.getItem('access_token') as string;
  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        authService.updateToken();
      }
    }),
  );
};
