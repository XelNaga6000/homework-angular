import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './components/first/first.component';
import { constantsToken, constantsInstance } from '../core/services/constants.service';

@NgModule({
  declarations: [
    FirstComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FirstComponent
  ],
  providers: [
    { provide: constantsToken, useValue: constantsInstance }
  ]
})
export class FirstModule { }
