import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
  }

  onBuy(): void {
    this.product.isAvailable = !this.product.isAvailable;
    this.cartService.addToCart(this.product);
  }

}
