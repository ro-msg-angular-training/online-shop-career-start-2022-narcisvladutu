import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import {HttpClientModule} from "@angular/common/http";
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    ProductViewComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
