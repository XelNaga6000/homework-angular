import { Product } from '../../products/models/product.model';

export class CartItem {
  constructor(
    public product: Product,
    public quantity: number = 1,
    public totalPrice: number = product.price
  ) { }
}
