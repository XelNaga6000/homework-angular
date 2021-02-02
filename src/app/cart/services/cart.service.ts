import { Injectable } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: Array<CartItem> = [];
  private totalQuantity = 0;
  private totalSum = 0;

  constructor() { }

  getProducts(): Array<CartItem> {
    return this.cartProducts;
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }

  getTotalSum(): number {
    return this.totalSum;
  }

  addProduct(product: Product, quantity: number = 1): void {
    const index = this.cartProducts.findIndex(c => c.product.id === product.id);

    if (index >= 0 && index < this.cartProducts.length) {
      this.cartProducts[index].quantity += quantity;
    } else {
      this.cartProducts.push(new CartItem(product, quantity));
    }

    this.updateCartData();
  }

  removeProduct(product: Product): void {
    const index = this.cartProducts.findIndex(c => c.product.id === product.id);

    if (index >= 0 && index < this.cartProducts.length) {
      this.cartProducts.splice(index, 1);
      this.updateCartData();
    }
  }

  removeAllProducts(): void {
    if (this.cartProducts.length) {
      this.cartProducts.splice(0, this.cartProducts.length);
      this.updateCartData();
    }
  }

  increaseQuantity(product: Product): void {
    this.changeQuantity(product, 1);
    this.updateCartData();
  }

  decreaseQuantity(product: Product): void {
    this.changeQuantity(product, -1);
    this.updateCartData();
  }

  isEmptyCart(): boolean {
    return this.cartProducts.length === 0 ;
  }

  private changeQuantity(product: Product, quantity: number): void {
    const index = this.cartProducts.findIndex(c => c.product.id === product.id);

    if (index >= 0 && index < this.cartProducts.length) {
      if (this.cartProducts[index].quantity + quantity > 0) {
        this.cartProducts[index].quantity += quantity;
      } else {
        this.cartProducts.splice(index, 1);
      }
    }
  }

  private updateCartData(): void {
    this.totalQuantity = this.cartProducts.reduce((acc, val) => acc + val.quantity, 0);
    this.totalSum = this.cartProducts.reduce((acc, val) => acc + (val.quantity * val.product.price), 0);
  }
}
