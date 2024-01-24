import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeslaService} from "../services/tesla.service";
import {ModelSelected} from "../models/modelSelected";
import {ModelOptionsResponse} from "../models/modelOptionsResponse";
import {take} from "rxjs";

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit {

  step2Form!: FormGroup;
  selectedModel!: ModelSelected;
  optionsModel!: ModelOptionsResponse;

  constructor(private teslaService: TeslaService) {}

  ngOnInit(): void {

    this.teslaService.selectedModel.pipe(take(1)).subscribe(res => {
      this.selectedModel = res;
      this.teslaService.getOptions(res.code).subscribe(options => {
        this.optionsModel = options;
        this.buildForm(res);
      })
    });
  }

  onChange() {
    let selected = new ModelSelected();
    selected.code = this.selectedModel.code;
    selected.color = this.selectedModel.color;
    selected.config = this.step2Form.get('configSelect')?.valid ? this.step2Form.get('configSelect')?.value : '';
    selected.tow = this.optionsModel.towHitch ? this.step2Form.get('includeTow')?.value : false;
    selected.yoke = this.optionsModel.yoke ? this.step2Form.get('includeYoke')?.value : false;
    this.teslaService.selectedModel.next(selected);
  }

  private buildForm(data: ModelSelected) {
    this.step2Form = new FormGroup({
      configSelect: new FormControl('', [Validators.required])
    });

    this.step2Form.patchValue({
      configSelect: data.config ? data.config : ''
    });

    if (this.optionsModel.towHitch) {
      this.step2Form.addControl('includeTow', new FormControl('', Validators.required));
      this.step2Form.patchValue({
        includeTow: data.tow
      });
    }

    if (this.optionsModel.yoke) {
      this.step2Form.addControl('includeYoke', new FormControl('', Validators.required));
      this.step2Form.patchValue({
        includeYoke: data.yoke
      });
    }
  }
}
