import { Component, Input, OnInit } from '@angular/core';
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
    return item.product.name;
  }

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.items = this.cartService.getCart();
  }

  onRemove(name: string): void {
    this.cartService.removeFromCart(name);
  }
}
