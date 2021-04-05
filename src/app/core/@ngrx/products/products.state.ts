import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { IProduct } from 'src/app/products/models/product.model';

export interface ProductsState extends EntityState<IProduct>  {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

function selectProductId(product: IProduct): string {
  return product.id;
}

function sortProductsByName(productA: IProduct, productB: IProduct): number {
  return productA.name.localeCompare(productB.name);
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: selectProductId,
  sortComparer: sortProductsByName
});

export const initialProductsState: ProductsState = adapter.getInitialState({
    loading: false,
    loaded: false,
    error: null
});
