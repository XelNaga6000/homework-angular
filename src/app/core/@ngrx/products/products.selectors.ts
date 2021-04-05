import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product } from './../../../products/models/product.model';

import { AppState } from './../app.state';
import { adapter, ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<AppState, ProductsState>('products');

export const {
  selectEntities: selectProductsEntities,
  selectAll: selectProductsData
} = adapter.getSelectors(selectProductsState);

export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

