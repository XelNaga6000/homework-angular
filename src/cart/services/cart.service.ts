import { Injectable } from '@angular/core';
import { Product } from 'src/products/models/product.model';
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
      existingItem.price += product.price;
    }
  }

  removeFromCart(name: string): void {
    this.cart = this.cart.filter(p => p.product.name !== name);
  }

  getCart(): Array<CartItem> {
    return this.cart;
  }
}
