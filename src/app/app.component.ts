import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from './cart/services/cart.service';
import { Role } from './core/enums/role';
import { AuthService } from './core/services/auth.service';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'BoozeMart';
  @ViewChild('appTitle') titleElement: ElementRef<HTMLHeadingElement>;

  get cartCount(): number {
    return this.cartService.getTotalQuantity();
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    public spinnerService: SpinnerService,
  ) {}

  ngAfterViewInit(): void {
    this.titleElement.nativeElement.innerText = this.title;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn && this.authService.role === Role.Admin;
  }
}
