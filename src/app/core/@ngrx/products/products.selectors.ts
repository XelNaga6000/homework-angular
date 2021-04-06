import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router';

import { Category, Product } from './../../../products/models/product.model';

import { AppState } from './../app.state';
import { adapter, ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<AppState, ProductsState>('products');

export const {
  selectEntities: selectProductsEntities,
  selectAll: selectProductsData
} = adapter.getSelectors(selectProductsState);

export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

export const selectSelectedProductByUrl = createSelector(
  selectProductsEntities,
  selectRouterState,
  (products, router): Product => {
      const productID = router.state.params.productID;
      if (productID) {
        return products[productID] as Product;
      } else {
        return new Product(null, '', '', 0, Category.Whisky, true);
      }
});
