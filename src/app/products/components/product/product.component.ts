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
  @Input() showControls = true;
  @Input() canBuy = true;
  @Input() editPath: string = null;
  @Output() buyProduct: EventEmitter<Product> = new EventEmitter<Product>();

  onBuy(): void {
    this.buyProduct.emit(this.product);
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === '+') {
      this.buyProduct.emit(this.product);
    }
  }

  constructor() {
  }
}
