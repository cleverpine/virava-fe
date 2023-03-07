import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTE_SIGN_IN} from 'src/app/app-routing.module';
import { MyErrorStateMatcher } from 'src/app/error-state-matcher';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  ROUTE_SIGN_IN = ROUTE_SIGN_IN;

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.nullValidator]),
    confirmPassword: new FormControl('', [Validators.required, Validators.nullValidator])
  });

  matcher = new MyErrorStateMatcher();
}
