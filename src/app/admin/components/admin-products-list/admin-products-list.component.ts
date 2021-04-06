import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsFacade } from 'src/app/core/@ngrx/products';
import { IProduct } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss']
})
export class AdminProductsListComponent implements OnInit {
  products$: Observable<ReadonlyArray<IProduct>>;
  productsError$: Observable<Error | string>;

  constructor(
    private productsFacade: ProductsFacade
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsFacade.products$;
    this.productsError$ = this.productsFacade.productsError$;

    this.productsFacade.loadProducts();
  }

  onDelete(product: IProduct): void {
    this.productsFacade.deleteProduct({ product });
  }
}
