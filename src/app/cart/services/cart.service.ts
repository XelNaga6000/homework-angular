import { Injectable } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Array<CartItem> = [];

  constructor() { }

  addToCart(product: Product): void {
    const existingItem = this.cart.find(c => c.product.name === product.name);

    if (!existingItem) {
      this.cart.push(new CartItem(product));
    } else {
      existingItem.count++;
      existingItem.totalPrice += product.price;
    }
  }

  removeFromCart(name: string): void {
    const index = this.cart.findIndex(c => c.product.name === name);

    if (index >= 0 && index < this.cart.length) {
      const existingItem = this.cart[index];

      if (existingItem.count > 1) {
        existingItem.totalPrice -= existingItem.price;
        existingItem.count--;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  getCart(): Array<CartItem> {
    return this.cart;
  }
}
