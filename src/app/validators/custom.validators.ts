import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static firstName(c: AbstractControl): ValidationErrors | null {
    if (c?.value !== undefined && !c.value.length) {
      return { required: true };
    }

    if (c?.value !== undefined && c.value === 'Stepan') {
      return { notStepan: true };
    }

    return null;
  }
}

