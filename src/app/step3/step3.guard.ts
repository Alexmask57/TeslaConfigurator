import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TeslaService} from "../services/tesla.service";
import {map, take} from "rxjs";

export const step3Guard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  return inject(TeslaService).selectedModel.pipe(
    take(1),
    map(res => {
      if (res.step2IsValid())
        return true;
      return router.createUrlTree(['/step2']);
    })
  )
};
