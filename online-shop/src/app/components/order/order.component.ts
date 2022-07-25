import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {take} from "rxjs";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {selectOrderProducts} from "../../store/selectors/order.selectors";
import {ProductQuantityModel} from "../../types/ProductQuantity.model";
import {saveOrder} from "../../store/actions/order.actions";
import {selectProductById} from "../../store/selectors/products..selectors";
import {ProductModelDisplay} from "../../types/product-display.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products: ProductModelDisplay[] = [];

  productsQuantity: ProductQuantityModel[] = []

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectOrderProducts).pipe(take(1))
      .subscribe((data) => this.productsQuantity = data)

    this.productsQuantity.forEach((x) => {
        for (let i = 1; i <= x.quantity; i++) {
          this.store.select(selectProductById(x.productId)).pipe(take(1)).subscribe((data) => {
            if (data !== undefined) this.products.push(data)
          })
        }
      }
    )
  }

  saveOrder() {
    this.store.dispatch(saveOrder({products: this.productsQuantity}));
  }
}
