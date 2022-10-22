import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      const value1 = control?.value;
      const value2 = matchingControl?.value;

      if (value1 !== value2) {
        matchingControl?.setErrors({ notMatch: true });
        return { noMatch: true };
      }
      matchingControl?.setErrors(null);
      return null;
    };
  }
}
