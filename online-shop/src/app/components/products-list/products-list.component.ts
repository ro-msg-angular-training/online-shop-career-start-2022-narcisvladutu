import {Component, OnInit} from '@angular/core';
import {ProductModelDisplay} from "../../types/product-display.model";
import {ProductService} from '../../services/product.service';
import {OrderModel} from "../../types/order.model";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

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
  productSubscription: Subscription | undefined;

  constructor(private productService: ProductService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe((data) => this.products = data)
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
    this.productSubscription?.unsubscribe();
  }
}
