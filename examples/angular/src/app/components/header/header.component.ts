import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_SIGN_IN } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logOut()?.then(res => {
      this.router.navigate([`/${ROUTE_SIGN_IN}`]);
    }).catch(err => {

    })
  }

}
