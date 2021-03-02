import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, delay, catchError, take } from 'rxjs/operators';
import { Category, Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<Product> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new Product(null, '', '', 0, Category.Whisky, true));
    }

    const id = route.paramMap.get('productID');

    return this.productsService.getProductById(id).pipe(
      delay(500),
      map((product: Product) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/admin/products']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/admin/products']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}
