import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';
import { FirstComponent } from './first/components/first/first.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartListComponent
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
