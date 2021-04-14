import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, Observable, of } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductsFacade } from 'src/app/core/@ngrx/products';
import { RouterLinkStubDirective } from 'src/app/testing-helpers/router-stubs';
import { Category, Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductListComponent } from './product-list.component';

const stubProducts = [
  {
    id: '1',
    name: 'Lagavulin',
    description: 'Good one',
    price: 100,
    category: Category.Whisky,
    isAvailable: true
  },
  {
    id: '2',
    name: 'Aznauri',
    description: 'Bad one',
    price: 10,
    category: Category.Wine,
    isAvailable: true
  }
];

describe('ProductList Component', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;

  let addProductSpy: jasmine.Spy;
  let isProductInCartSpy: jasmine.Spy;

  // Arrange
  beforeEach(() => {
    const cartSpy = jasmine.createSpyObj('CartService', ['addProduct', 'isProductInCart']);
    const facadeSpy = jasmine.createSpyObj('ProductsFacade', ['loadProducts'], {
      products$: of(stubProducts),
      productsError$: null
    });

    addProductSpy = cartSpy.addProduct.and.returnValue();
    isProductInCartSpy = cartSpy.isProductInCart.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        ProductComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: ProductsFacade, useValue: facadeSpy }
      ]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create ProductList component', () => {
    expect(component).toBeTruthy();
  });

  it('should show stub products list', async () => {
    fixture.detectChanges();

    await fixture.whenStable();

    fixture.detectChanges();

    const products = fixture.debugElement.queryAll(By.css('app-product'));

    expect(products.length).toBe(2);
    expect(products[0].componentInstance).toBeTruthy();
    expect(products[1].componentInstance).toBeTruthy();
    expect(products.map(p => p.componentInstance.product)).toEqual(stubProducts);
  });

  it('should buy product and put it into cart', () => {
    // Act
    component.onBuyProduct(stubProducts[0]);

    // Assert
    expect(addProductSpy.calls.count()).toBe(1);
    expect(addProductSpy.calls.argsFor(0)).toEqual([stubProducts[0], 1]);
  });

  it('should check if product already in cart', () => {
    // Act
    component.isProductInCart(stubProducts[0]);

    // Assert
    expect(isProductInCartSpy.calls.count()).toBe(1);
    expect(isProductInCartSpy.calls.argsFor(0)).toEqual([stubProducts[0].id]);
    expect(isProductInCartSpy.calls.mostRecent().returnValue).toEqual(true);
  });
});
