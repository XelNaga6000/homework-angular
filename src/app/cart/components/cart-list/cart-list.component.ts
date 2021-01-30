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
    this.items = this.cartService.getCartItems();
  }

  onIncreaseCount(product: Product): void {
    this.cartService.increaseProductCount(product);
  }

  onDecreaseCount(product: Product): void {
    this.cartService.decreaseProductCount(product);
  }

  onRemoveProduct(product: Product): void {
    this.cartService.removeProductFromCart(product);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }
}
