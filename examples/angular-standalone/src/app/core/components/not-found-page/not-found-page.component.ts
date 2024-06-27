import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

import { ROUTES } from "../../constants/app-routes.constants";

@Component({
  selector: 'not-found-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  routes = ROUTES;
}
