import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerService } from './spinner.service';
import { SpinnerComponent } from './spinner.component';



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [SpinnerComponent]
})
export class SpinnerModule {
  static forRoot(): ModuleWithProviders<SpinnerModule> {
    return {
      ngModule: SpinnerModule,
      providers: [SpinnerService]
    };
  }
}
