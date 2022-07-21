import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../types/order.model";
import {ProductService} from "../../services/product.service";
import {ProductModel} from "../../types/product.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: OrderModel = this.productService.getOrder();

  products: any[] = [];

  constructor(private productService: ProductService, private location: Location) {
  }

  ngOnInit(): void {
    this.order.products.forEach((x) => {
        for (let i = 1; i <= x.quantity; i++) {
          this.productService.getProductByID(x.productId).subscribe((data) => {
              let product = <ProductModel>data;
              this.products.push(product);
            }
          )
        }
      }
    )
    console.log(this.products);
  }

  saveOrder() {
    this.productService.saveOrder().subscribe(() => {
      alert(`Your order has been placed!`);
      this.goBack()
    });
  }

  goBack() {
    this.location.back();
  }
}
