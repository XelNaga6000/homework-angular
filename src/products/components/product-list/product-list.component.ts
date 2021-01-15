import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: Array<Product>;

  constructor(private productsService: ProductsService) {
    this.products = productsService.getProducts();
  }

  ngOnInit(): void {
  }

}
