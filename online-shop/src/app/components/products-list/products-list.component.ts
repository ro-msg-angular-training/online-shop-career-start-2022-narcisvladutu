import {Component, OnInit} from '@angular/core';
import {ProductModelDisplay} from "../../types/product-display.model";
import {ProductService} from '../../services/product.service';
import {OrderModel} from "../../types/order.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {loadProducts} from "../../store/actions/products.actions";
import {selectAllProducts} from "../../store/selectors/products..selectors";
import {AppState} from "../../store/state/app.state";
import {selectAdminRole, selectCustomerRole} from "../../store/selectors/auth.selectors";

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

  constructor(private productService: ProductService,
              private store: Store<AppState>) {
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

  onLeave() {
    this.productsSubscription?.unsubscribe();
  }
}
