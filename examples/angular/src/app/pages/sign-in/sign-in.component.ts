import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_HOME, ROUTE_RESET_PASSWORD, ROUTE_SIGN_UP } from 'src/app/app-routing.module';
import { MyErrorStateMatcher } from '../../error-state-matcher';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  ROUTE_SIGN_UP = ROUTE_SIGN_UP;
  ROUTE_RESET_PASSWORD = ROUTE_RESET_PASSWORD;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.nullValidator])
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  submitForm(e: any) {
    e.preventDefault();
    this.authService.login(this.signInForm.value.email, this.signInForm.value.password)
      ?.then(res => {
        this.router.navigate([`/${ROUTE_HOME}`])
      })
      .catch(e => console.error(e));
  }
}
