import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss']
})
export class AdminProductsListComponent implements OnInit {
  products: Observable<Array<Product>>;

  constructor(
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}
