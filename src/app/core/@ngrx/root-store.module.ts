import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// @NgRx
import { StoreModule } from '@ngrx/store';
import { ProductsStoreModule } from './products/products-store.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';

import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ProductsStoreModule,
  ]
})
export class RootStoreModule { }
