import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsPromiseService {
  private productsUrl = 'http://localhost:3333/products';

  constructor(private http: HttpClient) {}

  getProducts(): Promise<Product[]> {
    return this.http
      .get(this.productsUrl)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  getProductById(id: string): Promise<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  createProduct(product: Product): Promise<Product> {
    const url = this.productsUrl;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  updateProduct(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product.id}`;
    const body = JSON.stringify(product);
    const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
