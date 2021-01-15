import { Product } from 'src/products/models/product.model';

export class CartItem {
  product: Product;
  count: number;
  price: number;

  constructor(product: Product) {
    this.product = product;
    this.count = 1;
    this.price = product.price;
  }
}
