import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, Router, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegment, CanLoad
} from '@angular/router';

import { Observable } from 'rxjs';
import { Role } from '../enums/role';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanLoad Guard is called');
    const url = `/${segments.map(s => s.path).join('/')}`;
    return this.checkLogin(url) as boolean;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivate Guard is called');
    const { url } = state;
    return this.checkLogin(url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    console.log('CanActivateChild Guard is called');
    const { url } = state;
    return this.checkLogin(url);
  }


  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn && this.authService.role === Role.Admin) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
