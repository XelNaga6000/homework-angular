import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductViewComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductsModule { }
