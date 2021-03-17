import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { ProcessOrderComponent } from './components/process-order/process-order.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessOrderComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
