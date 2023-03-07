import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ChangePaswordComponent } from './pages/change-pasword/change-pasword.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const ROUTE_CHANGE_PASSWORD = 'change-password';
export const ROUTE_HOME = '';
export const ROUTE_RESET_PASSWORD = 'reset-password';
export const ROUTE_SIGN_IN = 'sign-in';
export const ROUTE_SIGN_UP = 'sign-up';

const routes: Routes = [{
  path: ROUTE_HOME,
  component: LayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: ROUTE_HOME,
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: ROUTE_CHANGE_PASSWORD,
      component: ChangePaswordComponent,
      canActivate: [AuthGuard]
    },
  ]
}, {
  path: ROUTE_RESET_PASSWORD,
  component: ResetComponent,
  canActivate: [NotAuthGuard]
}, {
  path: ROUTE_SIGN_IN,
  component: SignInComponent,
  canActivate: [NotAuthGuard]
}, {
  path: ROUTE_SIGN_UP,
  component: SignUpComponent,
  canActivate: [NotAuthGuard]
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
