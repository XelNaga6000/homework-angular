import { Injectable } from '@angular/core';
import { Product } from 'src/products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Array<Product> = [];

  constructor() { }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCart(): Array<Product> {
    return this.cart;
  }
}
