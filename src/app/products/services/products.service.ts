import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, share } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'http://localhost:3333/products';

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.productsUrl).pipe(
      retry(3),
      share(),
      catchError(this.handleError)
    );
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.get<Product>(url)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    const url = this.productsUrl;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<Product>(url, body, options)
      .pipe(
        catchError( this.handleError )
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<Product>(url, body, options)
      .pipe( catchError(this.handleError) );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
