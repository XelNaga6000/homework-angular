import { Injectable } from '@angular/core';
import { Categoty, Product } from '../models/product.model';

const products = [
  new Product('1,', 'Lagavulin', 'Good one', 100, Categoty.Whisky),
  new Product('2', 'Aznauri', 'Bad one', 10, Categoty.Wine),
  new Product('3', 'Macallan', 'Rare one', 1000, Categoty.Whisky, false)
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  getProducts(): Promise<Array<Product>> {
    return new Promise(resolve => {
      resolve(products);
    });
  }

  constructor() { }
}
