import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  constructor(private httpClient: HttpClient) { }
}
