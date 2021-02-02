import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './components/first/first.component';
import { constantsToken, constantsInstance } from '../core/services/constants.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FirstComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FirstComponent
  ],
  providers: [
    { provide: constantsToken, useValue: constantsInstance }
  ]
})
export class FirstModule { }
