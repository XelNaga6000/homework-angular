import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category, Product } from '../models/product.model';

const baseProducts = [
  new Product('1', 'Lagavulin', 'Good one', 100, Category.Whisky),
  new Product('2', 'Aznauri', 'Bad one', 10, Category.Wine),
  new Product('3', 'Macallan', 'Rare one', 1000, Category.Whisky, false)
];

const productsListObservable: Observable<Array<Product>> = of(baseProducts);

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Array<Product> = baseProducts;
  products$: Observable<Product[]> = productsListObservable;

  getProducts(): Observable<Array<Product>> {
    return this.products$;
  }

  getProductById(id: string): Observable<Product> {
    return this.products$
      .pipe(
        map((products: Array<Product>) => products.find(product => product.id === id)),
        catchError(err => throwError('Error in getUser method'))
      );
  }

  createProduct(product: Product): void {
    baseProducts.push(product);
  }

  updateProduct(product: Product): void {
    const i = baseProducts.findIndex(u => u.id === product.id);

    if (i > -1) {
      baseProducts.splice(i, 1, product);
    }
  }

  constructor() { }
}
