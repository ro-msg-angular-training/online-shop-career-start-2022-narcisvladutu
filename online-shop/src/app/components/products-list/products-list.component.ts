import {Component, OnInit} from '@angular/core';
import {ProductModelDisplay} from "../../types/product-display.model";
import {ProductService} from '../../services/product.service';
import {OrderModel} from "../../types/order.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductModelDisplay[] | undefined;
  selectedProductID: string | undefined;
  order: OrderModel = {products: []}

  constructor(private productService: ProductService) {
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
