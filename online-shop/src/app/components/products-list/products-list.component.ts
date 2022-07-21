import {Component, OnInit} from '@angular/core';
import {ProductModelDisplay} from "../../types/product-display.model";
import {ProductService} from '../../services/product.service';
import {OrderModel} from "../../types/order.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductModelDisplay[] | undefined;
  selectedProductID: string | undefined;
  order: OrderModel = this.productService.getOrder();
  hasAuthorisationOfAdmin: boolean = this.userService.hasRoleType("admin");
  hasAuthoristaionOfCustomer: boolean = this.userService.hasRoleType("customer");

  constructor(private productService: ProductService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => this.products = data)
  }

  refreshID(id: string) {
    this.selectedProductID = id;
    console.log(this.selectedProductID);
  }

  addToCart() {
    if (this.selectedProductID) {
      this.order = this.productService.actualizeOrder(this.selectedProductID, this.order);
      alert('Your order has been actualized!')
    }
  }
}
