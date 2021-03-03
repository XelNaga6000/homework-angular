import { NgModule } from '@angular/core';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [
    ProcessOrderComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  exports: [
    ProcessOrderComponent
  ]
})
export class OrderModule { }
