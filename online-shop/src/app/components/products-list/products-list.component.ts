import {Component, OnInit} from '@angular/core';
import {ProductModelDisplay} from "../../types/product-display.model";
import {ProductService} from '../../services/product.service';
import {OrderModel} from "../../types/order.model";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {loadProducts} from "../../store/actions/products.actions";
import {selectAllProducts} from "../../store/selectors/products..selectors";
import {AppState} from "../../store/state/app.state";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductModelDisplay[] | undefined;
  selectedProductID: string | undefined;
  order: OrderModel = {products: []};
  hasAuthorisationOfAdmin: boolean = false;
  hasAuthorisationOfCustomer: boolean = false;
  productsSubscription: Subscription | undefined;

  public allProducts$ = this.store.select(selectAllProducts);

  constructor(private productService: ProductService, private userService: UserService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
    this.productsSubscription = this.allProducts$?.subscribe((data)=>{this.products = data})
    this.hasAuthorisationOfAdmin = this.userService.hasRoleType("admin")
    this.hasAuthorisationOfCustomer = this.userService.hasRoleType("customer");
    this.order = this.productService.getOrder();
  }

  refreshID(id: string) {
    this.selectedProductID = id;
  }

  addToCart() {
    if (this.selectedProductID) {
      this.order = this.productService.actualizeOrder(this.selectedProductID, this.order);
      alert('Your order has been actualized!')
    }
  }

  onLeave(){
    this.productsSubscription?.unsubscribe();
  }
}
