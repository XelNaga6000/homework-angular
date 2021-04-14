/**
 * Shallow Test
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { CartService } from './cart/services/cart.service';
import { SpinnerService } from './widgets';
import { AuthService } from './core/services/auth.service';
import { AppSettingsService } from './core/services/app-settings.service';
import { defer, of } from 'rxjs';
import { Role } from './core/enums/role';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let debugElement: DebugElement;
let cartService: CartService;
let authService: AuthService;
let appSettingsService: AppSettingsService;
let spinnerService: SpinnerService;

const cartServiceStub = {
  getTotalQuantity: () => 10
};

const authServiceStub = {
  isLoggedIn: false,
  role: null
};

const appSettingsServiceStub = {
  getSettings: () => defer(() => of({
    appName: 'test name'
  }))
};

const spinnerServiceStub = {
  isVisible: () => false
};

describe('AppComponent (Shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: AppSettingsService, useValue: appSettingsServiceStub },
        { provide: SpinnerService, useValue: spinnerServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    cartService = fixture.debugElement.injector.get(CartService);
    authService = fixture.debugElement.injector.get(AuthService);
    appSettingsService = fixture.debugElement.injector.get(AppSettingsService);
    spinnerService = fixture.debugElement.injector.get(SpinnerService);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
    expect(cartService).toBeTruthy();
    expect(authService).toBeTruthy();
    expect(appSettingsService).toBeTruthy();
    expect(spinnerService).toBeTruthy();
  });

  it('should get correct total quantity value', () => {
    expect(component.cartCount).toBe(10);

    let cart = debugElement.query(By.css('a.nav-link.cart'));
    expect(cart).toBeTruthy();
    expect(cart.nativeElement.textContent).toBe('Cart (10)');

    cartService.getTotalQuantity = () => 0;
    fixture.detectChanges();

    cart = debugElement.query(By.css('a.nav-link.cart'));
    expect(cart).toBeTruthy();
    expect(cart.nativeElement.textContent).toBe('Cart ');
  });

  it('should get correct auth info', () => {
    expect(component.isLoggedIn()).toBe(false);

    let admin = debugElement.query(By.css('a.nav-link.admin'));
    expect(admin).toBeTruthy();
    expect(admin.nativeElement.textContent).toBe('Admin');

    authService.isLoggedIn = true;
    authService.role = Role.Admin;
    fixture.detectChanges();

    admin = debugElement.query(By.css('a.nav-link.admin'));
    expect(admin).toBeTruthy();
    expect(admin.nativeElement.textContent).toBe('Admin*');
  });

  it('should display correct title from settings', (done: DoneFn) => {
    appSettingsService.getSettings().subscribe(settings => {
      expect(settings.appName).toBe('test name');

      const title = debugElement.query(By.css('a.navbar-brand'));
      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent).toBe('test name');
      done();
    });
  });

  it('should get correct spinner status', () => {
    expect(component.spinnerService.isVisible()).toBe(false);

    spinnerService.isVisible = () => true;
    expect(component.spinnerService.isVisible()).toBe(true);
  });
});
