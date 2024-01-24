import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {TeslaService} from "./services/tesla.service";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ModelSelected} from "./models/modelSelected";
import {MenuComponent} from "./menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive, MenuComponent],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
  }

}
