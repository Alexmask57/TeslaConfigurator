import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf} from "@angular/common";
import {take} from "rxjs";
import {TeslaService} from "../services/tesla.service";
import {ModelSelected} from "../models/modelSelected";
import {ModelResponse} from "../models/modelResponse";
import {ModelOptionsResponse} from "../models/modelOptionsResponse";

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit, OnDestroy {

  selectedModel!: ModelSelected;
  modelResponse!: ModelResponse;
  modelOptionsResponse!: ModelOptionsResponse;

  constructor(private teslaService: TeslaService) {
  }

  ngOnInit(): void {
    this.teslaService.selectedModel.pipe(take(1)).subscribe(res => {
      this.selectedModel = res;
      this.teslaService.getOptions(res.code).subscribe(options => {
        this.modelOptionsResponse = options;
      });
      this.teslaService.getModels().subscribe(
        models => {
          this.modelResponse = models.findIndex(x => x.code == this.selectedModel.code) >= 0 ? models[models.findIndex(x => x.code == this.selectedModel.code)] : new ModelResponse();
        }
      )
    });
  }

  ngOnDestroy(): void {
  }

  getColor() {
    return this.modelResponse.colors[this.modelResponse.colors.findIndex(x => x.code == this.selectedModel.color)]
  }

  getTotal() {
    let total = this.modelOptionsResponse.configs[+this.selectedModel.config].price +
      this.getColor().price;
    if (this.selectedModel.tow)
      total += 1000;
    if (this.selectedModel.yoke)
      total += 1000;
    return total;
  }

}
