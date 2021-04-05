import { Injectable } from '@angular/core';

// @NgRx
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';

// Rxjs
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, concatMap, pluck } from 'rxjs/operators';

import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product.model';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService,
  ) {
  }

  getProducts$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(action =>
        this.productService.getProducts().pipe(
          map(products => ProductsActions.getProductsSuccess({ products })),
          catchError(error => of(ProductsActions.getProductsError({ error })))
        )
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: Product) =>
        this.productService.updateProduct(product).pipe(
          map(updatedProduct => {
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          }),
          catchError(error => of(ProductsActions.updateProductError({ error })))
        )
      )
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      pluck('product'),
      concatMap((product: Product) =>
        this.productService.createProduct(product).pipe(
          map(createdProduct => {
            return ProductsActions.createProductSuccess({ product: createdProduct });
          }),
          catchError(error => of(ProductsActions.createProductError({ error })))
        )
      )
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      pluck('product'),
      concatMap((product: Product) =>
        this.productService.deleteProduct(product).pipe(
          map(() => ProductsActions.deleteProductSuccess({ product })),
          catchError(error => of(ProductsActions.deleteProductError({ error })))
        )
      )
    )
  );
}
