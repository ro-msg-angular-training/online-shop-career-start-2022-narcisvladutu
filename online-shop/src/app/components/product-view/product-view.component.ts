import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductModel} from "../../types/product.model";
import {Observable, Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {selectCurrentProduct} from "../../store/selectors/product.selectors";
import {deleteProduct, getProduct} from "../../store/actions/product.actions";
import {selectAdminRole} from "../../store/selectors/auth.selectors";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  selectedProduct: ProductModel | null = null;
  id: string | null = "";
  hasAuthorisationOfAdmin: boolean = false;
  productSubscription: Subscription | undefined;

  product: Observable<ProductModel> | undefined;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.store.dispatch(getProduct({productId: this.id}))
      this.productSubscription = this.store.select(selectCurrentProduct).subscribe((data) => {
          this.selectedProduct = data
        }
      )
      ;
    }
    this.store.select(selectAdminRole).pipe(take(1)).subscribe((data) => this.hasAuthorisationOfAdmin = data);
  }

  deleteProduct() {
    if (this.id) {
      this.store.dispatch(deleteProduct({productId: this.id}))
      alert(`${this.selectedProduct?.name} has been deleted!`);
      this.goBack();
    }
  }

  goBack() {
    this.productSubscription?.unsubscribe()
  }
}
