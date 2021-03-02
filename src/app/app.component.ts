import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from './cart/services/cart.service';

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
    private cartService: CartService
  ) {}

  ngAfterViewInit(): void {
    this.titleElement.nativeElement.innerText = this.title;
  }
}
