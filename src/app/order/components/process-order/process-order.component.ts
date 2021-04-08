import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/cart/models/cart-item.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { RouterFacade } from 'src/app/core/@ngrx/router';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
import { generatedString, GeneratorFactory, GeneratorService } from 'src/app/core/services/generator.service';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  providers: [
    GeneratorService,
    { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
  ]
})
export class ProcessOrderComponent implements OnInit, CanComponentDeactivate {
  orderForm: FormGroup;
  cartItems: CartItem[];
  totalSum: number;

  constructor(
    @Inject(generatedString) public newID: string,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private routerFacade: RouterFacade,
    private dialogService: DialogService
  ) { }

  trackByProductId(index: number, item: CartItem): string {
    return item.product.id;
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getProducts();
    this.totalSum = this.cartService.getTotalSum();
    this.buildForm();
  }

  onSaveOrder(): void {

    console.log(this.orderForm.value);

    const {
      firstName,
      lastName,
      email,
      phone,
      selfPickup,
      address
    } = this.orderForm.value;

    const order = new Order(
      this.newID,
      this.cartService.getProducts(),
      this.cartService.getTotalSum(),
      firstName,
      lastName,
      email,
      phone,
      selfPickup,
      address
    );

    console.log(order);

    // const order = { ...this.order };

    // this.orderService.createOrder(order)
    //   .then(() => {
    //     this.cartService.removeAllProducts();
    //     this.routerFacade.goHome();
    //   })
    //   .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.routerFacade.goTo({ path: ['/cart'] });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.cartService.isEmptyCart()) {
      return true;
    }

    return this.dialogService.confirm('Are you sure?');
  }

  private buildForm(): void {
    this.orderForm = this.formBuilder.group({
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: '',
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.email]),
      phone: new FormControl('', {validators: [Validators.required]}),
      selfPickup: true,
      address: ''
    });
  }
}
