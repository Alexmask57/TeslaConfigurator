import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModelResponse} from "../models/modelResponse";
import {ModelOptionsResponse} from "../models/modelOptionsResponse";
import {BehaviorSubject, Subject} from "rxjs";
import {ModelSelected} from "../models/modelSelected";

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  selectedModel: BehaviorSubject<ModelSelected> = new BehaviorSubject<ModelSelected>(new ModelSelected());

  constructor(private httpClient: HttpClient) { }

  getModels(){
    return this.httpClient.get<ModelResponse[]>('/models');
  }

  getOptions(id: string){
    return this.httpClient.get<ModelOptionsResponse[]>(`/options/${id}`);
  }
}
