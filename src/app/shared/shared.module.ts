import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { BorderDirective } from './directives/border.directive';

@NgModule({
  declarations: [
    HighlightDirective,
    BorderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    BorderDirective
  ]
})
export class SharedModule { }
