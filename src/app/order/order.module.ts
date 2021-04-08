import { NgModule } from '@angular/core';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProcessOrderComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  exports: [
    ProcessOrderComponent
  ]
})
export class OrderModule { }
