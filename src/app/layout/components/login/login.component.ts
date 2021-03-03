import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras  } from '@angular/router';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/core/enums/role';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private role = Role.User;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

  onChange(value: string): void {
    console.log(value);
    this.role = value as Role;
  }

  onLogin(): void {
    const observer = {
      next: () => {
        if (this.authService.isLoggedIn && this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        }
      },
      error: (err: any) => console.log(err)
    };
    this.authService
      .login(this.role)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(observer);
  }

  onLogout(): void {
      this.authService.logout();
  }
}
