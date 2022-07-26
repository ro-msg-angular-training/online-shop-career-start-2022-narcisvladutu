import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductComponent} from './components/product/product.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductViewComponent} from './components/product-view/product-view.component';
import {HttpClientModule} from "@angular/common/http";
import {OrderComponent} from './components/order/order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {ReactiveFormsModule} from "@angular/forms";

import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {AddProductComponent} from './components/add-product/add-product.component';
import {LoginComponent} from './components/login/login.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {productsReducer} from "./store/reducers/products.reducers";
import {ProductsEffects} from "./store/effects/products.effects";
import {ProductEffects} from "./store/effects/product.effects";
import {productReducer} from "./store/reducers/product.reducers";
import {authReducer} from "./store/reducers/auth.reducers";
import {AuthEffects} from "./store/effects/auth.effects";
import {OrderEffects} from "./store/effects/order.effects";
import {orderReducer} from "./store/reducers/order.reducers";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

import { registerLocaleData } from '@angular/common';

import localeRo from '@angular/common/locales/ro';
registerLocaleData(localeRo);

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    ProductViewComponent,
    OrderComponent,
    EditProductComponent,
    AddProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot({
      products: productsReducer,
      product: productReducer,
      auth: authReducer,
      order: orderReducer
    }, {}),
    EffectsModule.forRoot([ProductsEffects, ProductEffects, AuthEffects, OrderEffects]),
    StoreRouterConnectingModule.forRoot(),
    MatTableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ro-RO'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
