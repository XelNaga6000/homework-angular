import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsModule } from '../products/products.module';
import { AdminProductsListComponent } from './components/admin-products-list/admin-products-list.component';
import { AdminComponent } from './admin.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminOrdersListComponent } from './components/admin-orders-list/admin-orders-list.component';

@NgModule({
  declarations: [
    AdminRoutingModule.components,
    AdminComponent,
    AdminProductFormComponent,
    AdminOrdersListComponent
  ],
  imports: [
    SharedModule,
    ProductsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
