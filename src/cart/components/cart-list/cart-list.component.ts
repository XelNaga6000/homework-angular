import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/products/models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  items: Array<CartItem>;

  trackByItem(index: number, item: CartItem): string {
    return item.product.name;
  }

  constructor(private cartService: CartService) {
    this.items = cartService.getCart();
  }

  ngOnInit(): void {
  }

  onRemove(name: string): void {
    this.cartService.removeFromCart(name);
    this.items = this.cartService.getCart();
  }
}
