import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/products/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  products: Array<Product>;

  trackByProduct(index: number, product: Product): string { 
    return product.name;
  }

  constructor(private cartService: CartService) {
    this.products = cartService.getCart();
  }

  ngOnInit(): void {
  }
}
