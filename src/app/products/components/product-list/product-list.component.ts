import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductsFacade } from 'src/app/core/@ngrx/products';
import { IProduct, Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ReadonlyArray<IProduct>>;
  productsError$: Observable<Error | string>;

  constructor(
    private productsFacade: ProductsFacade,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsFacade.products$;
    this.productsError$ = this.productsFacade.productsError$;

    this.productsFacade.loadProducts();
  }

  onBuyProduct(product: Product): void {
    this.cartService.addProduct(product, 1);
  }

  isProductInCart(product): boolean {
    return this.cartService.isProductInCart(product.id);
  }
}
