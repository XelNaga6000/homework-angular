import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsFacade } from 'src/app/core/@ngrx/products';
import { RouterFacade } from 'src/app/core/@ngrx/router';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
import { generatedString, GeneratorFactory, GeneratorService } from 'src/app/core/services/generator.service';
import { Product } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss'],
  providers: [
    GeneratorService,
    { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
  ]
})
export class AdminProductFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  product: Product;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  @ViewChild('form', { static: false })
  userForm: NgForm;
  private isSubmitClick = false;

  constructor(
    @Inject(generatedString) public newID: string,
    private productsFacade: ProductsFacade,
    private routerFacade: RouterFacade,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const observer: any = {
      next: (product: Product): void => {
        this.product = {...product};
      },
      error(err: Error | string): void {
        console.log(err);
      },
      complete(): void {
        console.log('Stream is completed');
      }
    };

    this.productsFacade.selectedProductByUrl$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveProduct(): void {
    const product = { ...this.product };
    this.isSubmitClick = true;

    if (product.id) {
      this.productsFacade.updateProduct({ product });
    } else {
      this.productsFacade.createProduct({
        product: {
          ...product,
          id: this.newID
        }
      });
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.routerFacade.goTo({ path: ['/admin/products'] });
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.isSubmitClick) {
        return true;
    }

    if (this.userForm.pristine) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
