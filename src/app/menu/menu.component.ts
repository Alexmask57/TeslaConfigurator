import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TeslaService} from "../services/tesla.service";

@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  accessToStep2: boolean = false;
  accessToStep3: boolean = false;

  constructor(private teslaService: TeslaService) {
  }

  ngOnInit() {
    this.teslaService.selectedModel.subscribe(res => {

      this.accessToStep2 = res.step1IsValid();
      this.accessToStep3 = res.step2IsValid();
    })
  }

}
