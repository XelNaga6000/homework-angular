import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, Observable, of } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductsFacade } from 'src/app/core/@ngrx/products';
import { RouterLinkStubDirective } from 'src/app/testing-helpers/router-stubs';
import { Category, Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';

const productStub = {
  id: '1',
  name: 'Lagavulin',
  description: 'Good one',
  price: 100,
  category: Category.Whisky,
  isAvailable: true
};

describe('Product Component', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;
  let debugEl: DebugElement;
  let productEl: HTMLElement;

  // Arrange
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        RouterLinkStubDirective
      ]
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    debugEl = fixture.debugElement.query(By.css('.card.product'));
    productEl = debugEl.nativeElement;
  });

  it('should create correct Product component', () => {
    // Arrange
    component.product = productStub;
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();

    const nameDe = debugEl.query(By.css('.card-title'));
    expect(nameDe.nativeElement.textContent).toBe(productStub.name);

    const descriptionDe = debugEl.query(By.css('.card-text'));
    expect(descriptionDe.nativeElement.textContent).toBe(productStub.description);

    const priceDe = debugEl.query(By.css('.product-price'));
    expect(priceDe.nativeElement.textContent).toBe(`$${productStub.price}`);

    const errorDe = debugEl.query(By.css('.error'));
    expect(errorDe).toBeFalsy();
  });

  it('should display Not in Stock when not available', () => {
    // Arrange
    component.product = { ...productStub, isAvailable: false };
    fixture.detectChanges();

    // Assert
    const errorDe = debugEl.query(By.css('.error'));
    expect(errorDe).toBeTruthy();
    expect(errorDe.nativeElement.textContent).toBe(' Not in Stock ');
  });

  it('should raise onBuy event when Buy button clicked', () => {
    // Arrange
    let boughtProduct: Product;

    component.product = productStub;
    fixture.detectChanges();

    component.buyProduct.subscribe((product: Product) => (boughtProduct = product));

    // Act
    const buyButton = fixture.debugElement.query(By.css('.buy-button'));
    buyButton.triggerEventHandler('click', null);

    // Assert
    expect(boughtProduct).toEqual(productStub);
  });
});
