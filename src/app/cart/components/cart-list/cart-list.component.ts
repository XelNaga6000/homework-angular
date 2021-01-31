import { Component, OnInit } from '@angular/core';
import { Product } from '../../../products/models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  items: Array<CartItem>;

  trackByProduct(index: number, item: CartItem): string {
    return item.product.id;
  }

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.items = this.cartService.getProducts();
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

  onRemoveAll():void {
    this.cartService.removeAllProducts();
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
