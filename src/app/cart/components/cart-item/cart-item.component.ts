import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/products/models/product.model';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  // Since item.count could be incremented from ProductItem component - OnPush strategy will not work here.
  // Dont know how to trigger it manually
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() item: CartItem;
  @Output() increaseCount: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() decreaseCount: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeProduct: EventEmitter<Product> = new EventEmitter<Product>();

  onIncrease(): void {
    this.increaseCount.emit(this.item.product);
  }

  onDecrease(): void {
    this.decreaseCount.emit(this.item.product);
  }

  onRemove(): void {
    this.removeProduct.emit(this.item.product);
  }

  onKeyUp(event: KeyboardEvent): void {
    switch (event?.key) {
      case '+':
        this.increaseCount.emit(this.item.product);
        return;
      case '-':
        this.decreaseCount.emit(this.item.product);
        return;
      case 'Delete':
        this.removeProduct.emit(this.item.product);
        return;
      default:
        return;
    }
  }
}
