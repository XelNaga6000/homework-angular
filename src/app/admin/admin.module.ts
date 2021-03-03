import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsModule } from '../products/products.module';
import { AdminComponent } from './admin.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminOrdersListComponent } from './components/admin-orders-list/admin-orders-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminRoutingModule.components,
    AdminComponent,
    AdminProductFormComponent,
    AdminOrdersListComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ProductsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
