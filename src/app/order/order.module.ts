import { NgModule } from '@angular/core';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from '../validators/validators.module';


@NgModule({
  declarations: [
    ProcessOrderComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    ValidatorsModule
  ],
  exports: [
    ProcessOrderComponent
  ]
})
export class OrderModule { }
