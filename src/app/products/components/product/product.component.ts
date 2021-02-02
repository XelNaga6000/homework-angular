import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product;
  @Output() buyProduct: EventEmitter<Product> = new EventEmitter<Product>();

  onBuy(): void {
    this.buyProduct.emit(this.product);
  }

  onKeyUp(event: KeyboardEvent): void {
    // если event задае как обязательный параметр, то, может, не надо его дополнительно проверять?
    if (event?.key === '+') {
      this.buyProduct.emit(this.product);
    }
  }
}
