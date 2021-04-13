import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Category, Product } from '../../products/models/product.model';
import { CartItem } from '../models/cart-item.model';

describe('CartSercvice', () => {
  let cartService: CartService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['getValue', 'setValue']);

    TestBed.configureTestingModule({
      providers: [CartService, { provide: LocalStorageService, useValue: spy }]
    });

    cartService = TestBed.inject(CartService);
    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should have correct default values', () => {
    expect(cartService.getTotalQuantity()).toBe(0);
    expect(cartService.getTotalSum()).toBe(0);
    expect(cartService.getProducts()).toEqual([]);
    expect(cartService.isEmptyCart()).toEqual(true);
  });

  it('should add product to cart', () => {
    const product1 = new Product('id', 'name', 'desc', 100, Category.Whisky, true);
    const quantity1 = 3;
    const expectedSum1 = quantity1 * product1.price;
    const expectedProducts1 = [new CartItem(product1, quantity1, expectedSum1)];

    cartService.addProduct(product1, quantity1);

    expect(cartService.getTotalQuantity()).toEqual(quantity1);
    expect(cartService.getTotalSum()).toEqual(expectedSum1);
    expect(cartService.getProducts()).toEqual(expectedProducts1);

    expect(localStorageServiceSpy.setValue.calls.count()).toEqual(3);
    expect(localStorageServiceSpy.setValue.calls.argsFor(0)).toEqual(['totalQuantity', quantity1]);
    expect(localStorageServiceSpy.setValue.calls.argsFor(1)).toEqual(['totalSum', expectedSum1]);
    expect(localStorageServiceSpy.setValue.calls.argsFor(2)).toEqual(['cartProducts', JSON.stringify(expectedProducts1)]);

    const product2 = new Product('id2', 'name2', 'desc2', 100, Category.Beer, true);
    const quantity2 = 2;
    const expectedSum2 = quantity2 * product2.price;
    const expectedProducts2 = [new CartItem(product2, quantity2, expectedSum2)];

    cartService.addProduct(product2, quantity2);

    expect(cartService.getTotalQuantity()).toEqual(quantity1 + quantity2);
    expect(cartService.getTotalSum()).toEqual(expectedSum1 + expectedSum2);
    expect(cartService.getProducts()).toEqual([...expectedProducts1, ...expectedProducts2]);
  });

  it('should remove product from cart', () => {
    const product1 = new Product('id', 'name', 'desc', 100, Category.Whisky, true);
    const product2 = new Product('id2', 'name2', 'desc2', 100, Category.Beer, true);

    cartService.addProduct(product1, 3);
    cartService.addProduct(product2, 2);

    expect(cartService.getTotalQuantity()).toEqual(5);

    cartService.removeProduct(product2);
    expect(localStorageServiceSpy.setValue.calls.count()).toEqual(9); // addProduct * 2, removeProduct

    expect(cartService.getTotalQuantity()).toEqual(3);
    expect(cartService.getTotalSum()).toEqual(product1.price * 3);
    expect(cartService.getProducts()).toEqual([new CartItem(product1, 3, product1.price * 3)]);

    cartService.removeAllProducts();

    expect(cartService.getTotalQuantity()).toEqual(0);
    expect(cartService.getTotalSum()).toEqual(0);
    expect(cartService.getProducts()).toEqual([]);
  });

  it('should change product quantity cart', () => {
    const product1 = new Product('id', 'name', 'desc', 100, Category.Whisky, true);
    const product2 = new Product('id2', 'name2', 'desc2', 100, Category.Beer, true);

    cartService.addProduct(product1, 3);
    cartService.addProduct(product2, 2);
    let expectedTotalSum = product1.price * 3 + product2.price * 2;

    expect(cartService.getTotalQuantity()).toEqual(5);
    expect(cartService.getTotalSum()).toEqual(expectedTotalSum);

    cartService.increaseQuantity(product1);
    expect(cartService.getTotalQuantity()).toEqual(6);
    expectedTotalSum = expectedTotalSum + product1.price;
    expect(cartService.getTotalSum()).toEqual(expectedTotalSum);

    cartService.decreaseQuantity(product2);
    expect(cartService.getTotalQuantity()).toEqual(5);
    expectedTotalSum = expectedTotalSum - product2.price;
    expect(cartService.getTotalSum()).toEqual(expectedTotalSum);
  });
});
