import { Routes } from '@angular/router';

import { HomeComponent } from "./core/components/home/home.component";
import { NotFoundPageComponent } from "./core/components/not-found-page/not-found-page.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundPageComponent },
];
