import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/widgets';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private spinner: SpinnerService
  ) {}

  isLoggedIn = false;
  role: Role = null;
  redirectUrl: string = null;

  login(role): Observable<boolean> {
    this.spinner.show();

    return of(role).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = true;
        this.role = val;
      }),
      finalize(() => this.spinner.hide())
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.role = null;
    this.redirectUrl = null;
  }
}
