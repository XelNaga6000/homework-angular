import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/cart/models/cart-item.model';
import { CartService } from 'src/app/cart/services/cart.service';
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
  public order: Order;

  constructor(
    @Inject(generatedString) public newID: string,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  trackByProductId(index: number, item: CartItem): string {
    return item.product.id;
  }

  ngOnInit(): void {
    this.order = new Order(
      this.newID,
      this.cartService.getProducts(),
      this.cartService.getTotalSum(),
      null,
      null
    );
  }

  onSaveOrder(): void {
    const order = { ...this.order };

    this.orderService.createOrder(order)
      .then(() => {
        this.cartService.removeAllProducts();
        this.router.navigate(['/products-list']);
      })
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['/cart']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.cartService.isEmptyCart()) {
      return true;
    }

    return this.dialogService.confirm('Are you sure?');
  }
}
