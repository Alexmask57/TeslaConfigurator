import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeslaService} from "../services/tesla.service";
import {ModelResponse} from "../models/modelResponse";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModelSelected} from "../models/modelSelected";
import {take} from "rxjs";

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component implements OnInit {

  step1Form!: FormGroup;
  models!: ModelResponse[];
  displayColor: boolean = false;
  displayImage: boolean = false;

  constructor(private teslaService: TeslaService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.teslaService.getModels().subscribe(res => {
      this.models = res;
      this.teslaService.selectedModel.pipe(take(1)).subscribe(res => {
        console.log(res);
        this.step1Form.patchValue({
          modelSelect: res.code ? this.models.findIndex(x => x.code == res.code) : '',
          colorSelect: res.color
        });
      })
    });
  }

  onChange() {
    // Set color when clicking on model
    if (this.step1Form.get('modelSelect')?.valid && !this.step1Form.get('colorSelect')?.valid)
      this.step1Form.get('colorSelect')?.setValue(this.models[this.step1Form.get('modelSelect')?.value].colors[0].code);

    let selected = new ModelSelected();
    selected.code = this.step1Form.get('modelSelect')?.valid ? this.models[this.step1Form.get('modelSelect')?.value].code : '';
    selected.color = this.step1Form.get('colorSelect')?.valid ? this.step1Form.get('colorSelect')?.value : '';
    this.teslaService.selectedModel.next(selected);


  }

  private buildForm() {
    this.step1Form = new FormGroup({
      modelSelect: new FormControl('', [Validators.required]),
      colorSelect: new FormControl('', [Validators.required]),
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };
  }

}
