import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTE_SIGN_IN } from 'src/app/app-routing.module';
import { MyErrorStateMatcher } from 'src/app/error-state-matcher';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  ROUTE_SIGN_IN = ROUTE_SIGN_IN;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  matcher = new MyErrorStateMatcher();
}
