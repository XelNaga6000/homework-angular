import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
  }]
})
export class EmailDirective implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (c?.value !== undefined && !re.test(String(c.value).toLowerCase())) {
      return { email: true };
    }

    return null;
  }
}
