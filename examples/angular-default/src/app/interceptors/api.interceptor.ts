import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, EMPTY, from, mergeMap, Observable, of, tap } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService,
    private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getData('access_token');

    // Apply the headers
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Also handle errors globally
    return next.handle(req).pipe(
      tap({
        next: (x) => {
          if (x instanceof HttpResponse) {
            this.authService.updateToken();
          }
        }
      }),
      catchError((err: HttpErrorResponse) => {
        // TODO: Handle the 401 error inside the Virava if possible
        if (err.status === 401) {
          return from(this.authService.updateToken()!).pipe(
            mergeMap(() => {
              // Check if the token has been updated
              const newToken = this.localStorageService.getData('access_token');
              if (newToken && newToken !== token) {
                // Token refreshed successfully, retry the request with the new token
                const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
                return next.handle(authReq);
              } else {
                // Refresh token has expired, logout the user
                this.authService.checkIfTokenHasExpired();
                return EMPTY;
              }
            }),
            catchError((err) => {
              // Error occurred during token update, logout the user if the refresh token is expired, otherwise update the token
              this.authService.checkIfTokenHasExpired();
              return of(err);
            })
          );
        }

        return of(err)
      })
    );
  }
}
