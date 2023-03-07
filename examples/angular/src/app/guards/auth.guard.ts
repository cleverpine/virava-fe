import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { ROUTE_SIGN_IN } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate([`/${ROUTE_SIGN_IN}`]); // go to login if not authenticated
      return false;
    }
    return true;
  }
}