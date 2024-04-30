import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_SIGN_IN } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  logout() {
    this.authService.logout()?.then(() => {
      this.router.navigate([`/${ROUTE_SIGN_IN}`]);
    }).catch(err => {
      console.error(err);
    })
  }
}
