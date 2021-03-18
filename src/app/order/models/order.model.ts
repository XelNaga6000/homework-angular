import { CartItem } from '../../cart/models/cart-item.model';

export class Order {
  constructor(
    public id: string,
    public cartItems: Array<CartItem>,
    public totalSum: number,
    public name: string,
    public address: string
  ) { }
}
