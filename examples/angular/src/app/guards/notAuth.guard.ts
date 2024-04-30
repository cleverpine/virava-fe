import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTE_HOME } from '../app-routing.module';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isLoggedIn()) {
      this.router.navigate([`${ROUTE_HOME}`]); // go to home if authenticated
      return false;
    }
    return true;
  }
}