import { CartItem } from '../../cart/models/cart-item.model';

export class Order {
  constructor(
    public cartItems: Array<CartItem>
  ) { }
}
