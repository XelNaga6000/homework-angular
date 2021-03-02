import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  product: Product;
  
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: Product) => {
      this.product = { ...product };
    });
  }

  onSaveProduct() {
  }

  onGoBack() {
    this.router.navigate(['/admin/products']);
  }
}
