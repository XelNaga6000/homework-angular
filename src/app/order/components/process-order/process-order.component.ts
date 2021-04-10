import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CartItem } from 'src/app/cart/models/cart-item.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { RouterFacade } from 'src/app/core/@ngrx/router';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
import { generatedString, GeneratorFactory, GeneratorService } from 'src/app/core/services/generator.service';
import { CustomValidators } from 'src/app/validators/custom.validators';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  providers: [
    GeneratorService,
    { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
  ]
})
export class ProcessOrderComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  private sub: Subscription;
  orderForm: FormGroup;
  cartItems: CartItem[];
  totalSum: number;

  validationMessagesMap = new Map([
    ['firstName', {
      message: '',
      required: 'Please enter your first name.',
      notStepan: `We don't sell booze to Stepan due to last accident.`
    }],
    ['email', {
      message: '',
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.'
    }],
    ['address', {
      message: '',
      required: 'Please enter your address.'
    }]
  ]);

  phonesMessagesMap = new Map([
    ['phones', {
      messageMap:  new Map(),
      required: 'Please enter your phone number.',
      pattern: 'Please enter a valid phone number.'
    }]
  ]);

  addressPlaceholder = 'Address';

  get selfPickup(): AbstractControl {
    return this.orderForm.get('selfPickup');
  }

  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  constructor(
    @Inject(generatedString) public newID: string,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private routerFacade: RouterFacade,
    private dialogService: DialogService
  ) { }

  trackByProductId(index: number, item: CartItem): string {
    return item.product.id;
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getProducts();
    this.totalSum = this.cartService.getTotalSum();
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhones());
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSaveOrder(): void {
    const order = new Order(
      this.newID,
      this.cartService.getProducts(),
      this.cartService.getTotalSum(),
      this.orderForm.value.firstName,
      this.orderForm.value.lastName,
      this.orderForm.value.email,
      this.orderForm.value.phones,
      this.orderForm.value.selfPickup,
      this.orderForm.value.address
    );

    this.orderService.createOrder(order)
      .then(() => {
        this.cartService.removeAllProducts();
        this.routerFacade.goHome();
      })
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.routerFacade.goTo({ path: ['/cart'] });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.cartService.isEmptyCart()) {
      return true;
    }

    return this.dialogService.confirm('Are you sure?');
  }

  private buildForm(): void {
    this.orderForm = this.formBuilder.group({
      firstName: new FormControl('', {validators: [CustomValidators.firstName]}),
      lastName: '',
      email: '',
      phones: this.formBuilder.array([this.buildPhones()]),
      selfPickup: false,
      address: ''
    });
  }

  private buildPhones(): FormControl {
    return this.formBuilder.control('', {validators: [Validators.required, Validators.pattern('380[0-9]{9}')]});
  }

  private watchValueChanges(): void {
    this.sub = this.selfPickup.valueChanges
      .subscribe(value => this.setAddressValidator(value));

    this.sub.add(this.orderForm.valueChanges
      .pipe(debounceTime(350) )
      .subscribe(() => this.setValidationMessages()));
  }

  private setValidationMessages(): void {
    this.validationMessagesMap.forEach((control, controlName) => {
      this.validationMessagesMap.get(controlName).message = '';

      const c: AbstractControl = this.orderForm.get(controlName);
      const errors = this.getControlErrors(controlName, c, this.validationMessagesMap);

      if (errors) {
        this.validationMessagesMap.get(controlName).message = errors;
      }
    });

    this.setPhoneValidationMessages();
  }

  private setPhoneValidationMessages(): void {
    this.phonesMessagesMap.get('phones').messageMap.clear();

    const phones = this.orderForm.get('phones') as FormArray;
    phones.controls.forEach((phone, index) => {
      const errors = this.getControlErrors('phones', phone, this.phonesMessagesMap);
      if (errors) {
        this.phonesMessagesMap.get('phones').messageMap.set(index, errors);
      }
    });
  }

  private getControlErrors(controlName: string, c: AbstractControl, errorsMap: Map<string, object>): string | null {
    if ((c.touched || c.dirty) && c.invalid && c.errors) {
      return Object.keys(c.errors)
        .map(key => errorsMap.get(controlName)[key])
        .join('<br />');
    }

    return null;
  }

  private setAddressValidator(checked: boolean): void {
    if (checked) {
      this.orderForm.get('address').setValidators(Validators.required);
      this.addressPlaceholder = 'Address (required)';
    } else {
      this.orderForm.get('address').clearValidators();
      this.addressPlaceholder = 'Address';
    }

    this.orderForm.get('address').updateValueAndValidity();
  }
}
