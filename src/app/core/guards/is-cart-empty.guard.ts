import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class IsCartEmptyGuard implements CanLoad {
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isEmptyCart = this.cartService.isEmptyCart();
      console.log('IsCartEmpty Guard is called', isEmptyCart);

      if (isEmptyCart) {
        this.router.navigate(['/products-list']);
      }

      return !isEmptyCart;
  }
}
