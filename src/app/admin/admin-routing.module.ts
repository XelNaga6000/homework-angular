import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminOrdersListComponent } from './components/admin-orders-list/admin-orders-list.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsListComponent } from './components/admin-products-list/admin-products-list.component';
import { ProductResolveGuard } from './guards/product-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'products', component: AdminProductsListComponent },
      { path: 'products/add', component: AdminProductFormComponent, resolve: { product: ProductResolveGuard } },
      { path: 'products/edit/:productID', component: AdminProductFormComponent, resolve: { product: ProductResolveGuard } },
      { path: 'orders', component: AdminOrdersListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [AdminProductsListComponent, AdminProductFormComponent, AdminOrdersListComponent];
}
