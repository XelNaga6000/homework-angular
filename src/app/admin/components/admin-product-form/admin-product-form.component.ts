import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
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
export class AdminProductFormComponent implements OnInit, CanComponentDeactivate {
  product: Product;
  originalProduct: Product;
  private sub: Subscription;

  constructor(
    @Inject(generatedString) public newID: string,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: Product) => {
      this.product = { ...product };
      this.originalProduct = { ...product };
    });
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    const observer = {
      next: (savedProduct: Product) => {
        this.originalProduct = { ...savedProduct };
        this.onGoBack();
      },
      error: (err: any) => console.log(err)
    };

    if (product.id) {
      this.sub = this.productsService.updateProduct(product).subscribe(observer);
    } else {
      this.sub = this.productsService.createProduct({
        ...product,
        id: this.newID
      }).subscribe(observer);
    }
  }

  onGoBack(): void {
    this.router.navigate(['/admin/products']);
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originalProduct).map(key => {
      if (this.originalProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
