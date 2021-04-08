import { CartItem } from '../../cart/models/cart-item.model';

export class Order {
  constructor(
    public id: string,
    public cartItems: Array<CartItem>,
    public totalSum: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: number,
    public selfPickup: boolean = false,
    public address: string,
  ) { }
}
