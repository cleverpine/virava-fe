import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, tap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from "../services/local-storage.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService,
    private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getData('access_token');

    if (!token) {
      return next.handle(req);
    }

    // Apply the headers
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Also handle errors globally
    return next.handle(req).pipe(
      tap(),
      catchError((err: any) => {
        if (err.status === 401) {
          this.authService.logout();
        }

        return throwError(() => err);
      }),
    );
  }
}
