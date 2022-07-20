import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "./components/product-view/product-view.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";
import {OrderComponent} from "./components/order/order.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";


const routes: Routes = [
  {path:"", redirectTo:"products", pathMatch: 'full'},
  {path: "products", component: ProductsListComponent},
  {path:"product/:id", component: ProductViewComponent},
  {path: "order", component: OrderComponent},
  {path: "edit-product/:id", component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
