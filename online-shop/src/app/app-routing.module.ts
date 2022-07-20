import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "./components/product-view/product-view.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";
import {OrderComponent} from "./components/order/order.component";

const routes: Routes = [
  {path:"", redirectTo:"products", pathMatch: 'full'},
  {path: "products", component: ProductsListComponent},
  {path:"product/:id", component: ProductViewComponent},
  {path: "order", component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
