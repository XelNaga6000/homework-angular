import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Array<Product>; // зачем тут декоратор, если данные получаем внутри компонента?

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onBuyProduct(product: Product): void {
    this.cartService.increaseProductCount(product);
  }
}
