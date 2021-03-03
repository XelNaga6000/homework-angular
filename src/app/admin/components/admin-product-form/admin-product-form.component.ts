import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { generatedString, GeneratorFactory, GeneratorService } from 'src/app/core/services/generator.service';
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss'],
  providers: [
    GeneratorService,
    { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
  ]
})
export class AdminProductFormComponent implements OnInit {
  product: Product;
  originalProduct: Product;

  constructor(
    @Inject(generatedString) public newID: string,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: Product) => {
      this.product = { ...product };
      this.originalProduct = { ...product };
    });
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
      this.router.navigate(['/admin/products']);
    } else {
      this.productsService.createProduct({
        ...product,
        id: this.newID
      });
      this.onGoBack();
    }
    this.originalProduct = { ...this.product };
  }

  onGoBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
