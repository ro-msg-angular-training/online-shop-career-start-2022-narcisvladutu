import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductViewComponent} from "./components/product-view/product-view.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";
import {OrderComponent} from "./components/order/order.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";
import {AddProductComponent} from "./components/add-product/add-product.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
  {path: "", canActivate: [AuthGuard], children:
  [{path: "products", component: ProductsListComponent},
    {path:"product/:id", component: ProductViewComponent},
    {path: "order", component: OrderComponent},
    {path: "edit-product/:id", component: EditProductComponent},
    {path: "add-product", component: AddProductComponent}]},
  {path:"", redirectTo:"login", pathMatch: 'full'},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
