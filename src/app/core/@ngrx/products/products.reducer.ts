import { Action, createReducer, on } from '@ngrx/store';

import { adapter, initialProductsState, ProductsState } from './products.state';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.getProducts, state => {
    console.log('GET_PRODUCTS action being handled!');
    return {
      ...state,
      loading: true
    };
  }),
  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled!');
    return adapter.setAll(products, {...state, loading: false, loaded: true });
  }),
  on(
    ProductsActions.getProductsError,
    (state, { error }) => {
    console.log('GET_PRODUCTS_ERROR action being handled!');
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
  on(ProductsActions.createProduct, state => {
    console.log('CREATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.createProductSuccess, (state, { product }) => {
    console.log('CREATE_PRODUCT_SUCCESS action being handled!');
    return adapter.addOne(product, state);
  }),
  on(ProductsActions.updateProduct, state => {
    console.log('UPDATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.updateProductSuccess, (state, { product }) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    return adapter.updateOne({ id: product.id, changes: product }, state);
  }),
  on(ProductsActions.deleteProduct, state => {
    console.log('DELETE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.deleteProductSuccess, (state, { product }) => {
    console.log('DELETE_PRODUCT_SUCCESS action being handled!');
    return adapter.removeOne(product.id, state);
  }),
  on(
    ProductsActions.createProductError,
    ProductsActions.updateProductError,
    ProductsActions.deleteProductError,
    (state, { error }) => {
      console.log('CREATE/UPDATE/DELETE_PRODUCT_ERROR action being handled!');
      return {
        ...state,
        error
      };
    })
);

export function productsReducer(state: ProductsState | undefined, action: Action): ProductsState {
  return reducer(state, action);
}
