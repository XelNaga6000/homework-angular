import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { AdminComponent } from './admin.component';
import { AdminOrdersListComponent } from './components/admin-orders-list/admin-orders-list.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsListComponent } from './components/admin-products-list/admin-products-list.component';
import { ProductResolveGuard } from './guards/product-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'products',
            component: AdminProductsListComponent
          },
          {
            path: 'products/add',
            component: AdminProductFormComponent,
            resolve: { product: ProductResolveGuard } // for default values set in one place
          },
          {
            path: 'products/edit/:productID',
            component: AdminProductFormComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: { product: ProductResolveGuard
            }
          },
          {
            path: 'orders',
            component: AdminOrdersListComponent
          },
        ]
      }
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
