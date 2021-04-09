import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static firstName(c: AbstractControl): ValidationErrors | null {
    if (c?.value !== undefined && (!c.value.length || c.value === 'Stepan')) {
      return { firstName: true };
    }

    return null;
  }
}

