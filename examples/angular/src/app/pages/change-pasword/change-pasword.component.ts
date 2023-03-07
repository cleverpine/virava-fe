import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTE_SIGN_IN } from 'src/app/app-routing.module';
import { MyErrorStateMatcher } from 'src/app/error-state-matcher';

@Component({
  selector: 'app-change-pasword',
  templateUrl: './change-pasword.component.html',
  styleUrls: ['./change-pasword.component.scss']
})
export class ChangePaswordComponent {
  ROUTE_SIGN_IN = ROUTE_SIGN_IN;

  changePasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    currentPassword: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.email]),
    confirmPassword: new FormControl('', [Validators.required, Validators.email]),
  });

  matcher = new MyErrorStateMatcher();
}
