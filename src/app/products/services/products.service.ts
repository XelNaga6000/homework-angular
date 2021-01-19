import { Injectable } from '@angular/core';
import { Categoty, Product } from '../models/product.model';

const products = [
  new Product('Lagavulin', 'Good one', 100, Categoty.Whisky),
  new Product('Aznauri', 'Bad one', 10, Categoty.Wine)
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  getProducts(): Array<Product> {
    return products;
  }

  constructor() { }
}
