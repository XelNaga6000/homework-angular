import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstModule } from './first/first.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimingInterceptor } from './core/interceptors/timing.interceptor';
import { RootStoreModule } from './core/@ngrx/root-store.module';
// import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FirstModule,
    ProductsModule,
    CartModule,
    LayoutModule,
    SpinnerModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    RootStoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(router: Router) {
  //   const replacer = (key: string, value: any): string =>
  //     typeof value === 'function' ? value.name : value;

  //   console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  // }
}
