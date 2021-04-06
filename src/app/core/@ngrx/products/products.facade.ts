import { Injectable } from '@angular/core';

// @ngrx
import { Store, select } from '@ngrx/store';
import {
  selectProductsData,
  selectProductsError,
  selectProductsLoaded
} from './products.selectors';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';

// rxjs
import { Observable } from 'rxjs';

import { IProduct } from './../../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {
  products$: Observable<ReadonlyArray<IProduct>>;
  productsError$: Observable<Error | string>;
  productsLoaded$: Observable<boolean>;

  constructor(private store: Store) {
    this.productsError$ = this.store.select(selectProductsError);
    this.productsLoaded$ = this.store.select(selectProductsLoaded);
    this.products$ = this.store.select(selectProductsData);
  }

  loadProducts(): void {
    this.store.dispatch(ProductsActions.getProducts());
  }

  createProduct(props: { product: IProduct }): void {
    this.store.dispatch(ProductsActions.createProduct(props));
  }

  updateProduct(props: { product: IProduct }): void {
    this.store.dispatch(ProductsActions.updateProduct(props));
  }

  deleteProduct(props: { product: IProduct }): void {
    this.store.dispatch(ProductsActions.deleteProduct(props));
  }
}
