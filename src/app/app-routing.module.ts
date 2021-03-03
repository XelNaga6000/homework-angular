import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { IsCartEmptyGuard } from './core/guards/is-cart-empty.guard';
import { FirstComponent } from './first/components/first/first.component';
import { LoginComponent, PathNotFoundComponent } from './layout';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
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
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
