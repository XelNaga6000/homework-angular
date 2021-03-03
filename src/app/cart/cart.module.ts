import { NgModule } from '@angular/core';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { localStorageInstance, LocalStorageService } from '../core/services/local-storage.service';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule,
    CartRoutingModule
  ],
  exports: [
    CartListComponent
  ],
  providers: [
    { provide: LocalStorageService, useValue: localStorageInstance }
  ]
})
export class CartModule { }
