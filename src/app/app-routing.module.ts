import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsCartEmptyGuard } from './core/guards/is-cart-empty.guard';
import { FirstComponent } from './first/components/first/first.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'order',
    canLoad: [IsCartEmptyGuard],
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'first',
    component: FirstComponent
  },
  {
    path: '',
    redirectTo: '/products-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
