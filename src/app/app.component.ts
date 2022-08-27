import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quran';
  constructor(
            private router: Router)
  {}
  // callReader($event: MouseEvent) {
  //   this.router.navigate("https://maqraa.com/ar/");
  // }
}
