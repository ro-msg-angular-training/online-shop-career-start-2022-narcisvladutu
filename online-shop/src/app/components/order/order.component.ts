import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../types/order.model";
import {ProductService} from "../../services/product.service";
import {ProductModel} from "../../types/product.model";
import {Router} from "@angular/router";
import {forkJoin, map} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: OrderModel = {products: []};

  products: ProductModel[] = [];

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.order = this.productService.getOrder();

    // I'll keep it for the moment
    // this.order.products.forEach((x) => {
    //     for (let i = 1; i <= x.quantity; i++) {
    //       this.productService.getProductByID(x.productId).subscribe((data) => {
    //           let product = <ProductModel>data;
    //           this.products.push(product);
    //         }
    //       )
    //     }
    //   }
    // )

    this.order.products.forEach((x) => {
        for (let i = 1; i <= x.quantity; i++) {
          const observable = forkJoin(this.productService.getProductByID(x.productId).pipe(map((data) => {
              return <ProductModel>data;
            }
          )))
          observable.subscribe((data) => {
            this.products.push(...data)
          })
        }
      }
    )

  }

  saveOrder() {
    this.productService.saveOrder().subscribe(() => {
      alert(`Your order has been placed!`);
      this.goBack()
    });
  }

  goBack() {
    this.router.navigateByUrl('/products');
  }
}
