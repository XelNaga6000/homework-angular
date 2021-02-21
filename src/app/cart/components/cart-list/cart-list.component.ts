import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../products/models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  orderByAttribute = 'totalPrice';
  isAscOrder = false;

  get items(): Array<CartItem> {
    return this.cartService.getProducts();
  }

  trackByProduct(index: number, item: CartItem): string {
    return item.product.id;
  }

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onOrderChange(event: Event): void {
    const selectEl = (event.target as HTMLSelectElement);
    const orderBy = selectEl.options[selectEl.selectedIndex].id;

    this.orderByAttribute = orderBy;
  }

  onAscChange(event: Event): void {
    const ascEl = (event.target as HTMLInputElement);
    this.isAscOrder = ascEl.checked;
  }

  onIncreaseCount(product: Product): void {
    this.cartService.increaseQuantity(product);
  }

  onDecreaseCount(product: Product): void {
    this.cartService.decreaseQuantity(product);
  }

  onRemoveProduct(product: Product): void {
    this.cartService.removeProduct(product);
  }

  onRemoveAll(): void {
    this.cartService.removeAllProducts();
  }

  onCheckout(): void {
    const orderedProducts = this.cartService.getProducts();
    console.log('Order: ', orderedProducts);

    this.router.navigate(['/order']);
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  getTotalSum(): number {
    return this.cartService.getTotalSum();
  }

  isEmptyCart(): boolean {
    return this.cartService.isEmptyCart();
  }
}
