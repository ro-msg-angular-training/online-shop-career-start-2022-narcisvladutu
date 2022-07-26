import {Component, OnInit} from '@angular/core';
import {ProductModelDisplay} from "../../types/product-display.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {loadProducts} from "../../store/actions/products.actions";
import {selectAllProducts} from "../../store/selectors/products..selectors";
import {AppState} from "../../store/state/app.state";
import {selectAdminRole, selectCustomerRole} from "../../store/selectors/auth.selectors";
import {actualizeOrder} from "../../store/actions/order.actions";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductModelDisplay[] | undefined;
  selectedProductID: string | undefined;
  hasAuthorisationOfAdmin: boolean = false;
  hasAuthorisationOfCustomer: boolean = false;
  productsSubscription: Subscription | undefined;

  public allProducts$ = this.store.select(selectAllProducts);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
    this.productsSubscription = this.allProducts$?.subscribe((data) => {
      this.products = data
    })
    this.store.select(selectAdminRole).subscribe((data) =>
      this.hasAuthorisationOfAdmin = data)
    this.store.select(selectCustomerRole).subscribe((data) =>
      this.hasAuthorisationOfCustomer = data)
  }

  refreshID(id: string) {
    this.selectedProductID = id;
  }

  addToCart() {
    if (this.selectedProductID !== undefined) {
      this.store.dispatch(actualizeOrder({productID: this.selectedProductID}))
    }
  }

  onLeave() {
    this.productsSubscription?.unsubscribe();
  }
}
