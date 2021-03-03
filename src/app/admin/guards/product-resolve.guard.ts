import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, delay, catchError, take, finalize } from 'rxjs/operators';
import { Category, Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { SpinnerService } from 'src/app/widgets';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<Product> {
  constructor(
    private productsService: ProductsService,
    private spinner: SpinnerService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new Product(null, '', '', 0, Category.Beer, true));
    }

    this.spinner.show();
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
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
