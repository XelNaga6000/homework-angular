import { Injectable } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Array<CartItem> = [];

  constructor() { }

  increaseProductCount(product: Product): void {
    const index = this.cart.findIndex(c => c.product.id === product.id);

    if (index >= 0 && index < this.cart.length) {
      this.cart[index].count++;
    } else {
      this.cart.push(new CartItem(product));
    }
  }

  decreaseProductCount(product: Product): void {
    const index = this.cart.findIndex(c => c.product.id === product.id);

    if (index >= 0 && index < this.cart.length) {
      if (this.cart[index].count > 1) {
        this.cart[index].count--;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  removeProductFromCart(product: Product): void {
    const index = this.cart.findIndex(c => c.product.id === product.id);

    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
    }
  }

  getCartItems(): Array<CartItem> {
    return this.cart;
  }

  getCartTotal(): number {
    return this.cart.reduce((acc, val) => acc + (val.count * val.product.price), 0);
  }
}
