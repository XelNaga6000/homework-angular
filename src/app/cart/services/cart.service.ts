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

      const first = this.cart.slice(0, index);
      const last = this.cart.slice(index + 1);

      this.cart = [...first, { ...this.cart[index], count: this.cart[index].count + 1}, ...last];
      // this.cart[index].count++;
    } else {
      this.cart = [...this.cart, new CartItem(product)];
      // this.cart.push(new CartItem(product));
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
