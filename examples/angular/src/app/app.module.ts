import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ChangePaswordComponent } from './pages/change-pasword/change-pasword.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthService } from "./services/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResetComponent,
    SignInComponent,
    SignUpComponent,
    ChangePaswordComponent,
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
