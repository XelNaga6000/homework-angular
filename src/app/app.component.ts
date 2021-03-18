import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from './cart/services/cart.service';
import { Role } from './core/enums/role';
import { AppSettingsService } from './core/services/app-settings.service';
import { AuthService } from './core/services/auth.service';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') titleElement: ElementRef<HTMLHeadingElement>;

  get cartCount(): number {
    return this.cartService.getTotalQuantity();
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private appSettingsService: AppSettingsService,
    public spinnerService: SpinnerService,
  ) {}

  ngAfterViewInit(): void {
    this.appSettingsService.getSettings().subscribe(settings => {
      this.titleElement.nativeElement.innerText = settings.appName;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn && this.authService.role === Role.Admin;
  }
}
