import { Product } from 'src/products/models/product.model';

export class CartItem {
  constructor(
    public product: Product,
    public count: number = 1,
    public price: number = product.price,
    public totalPrice: number = product.price
  ) { }
}
