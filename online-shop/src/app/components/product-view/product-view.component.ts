import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from "../../types/product.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {selectCurrentProduct} from "../../store/selectors/product.selectors";
import {deleteProduct, getProduct} from "../../store/actions/product.actions";

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

  constructor(private route: ActivatedRoute, private http: HttpClient,
              private router: Router, private userService: UserService, private store: Store<AppState>) {
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
    this.hasAuthorisationOfAdmin = this.userService.hasRoleType("admin");
  }

  deleteProduct() {
    if (this.id) {
      this.store.dispatch(deleteProduct({productId: this.id}))
      alert(`${this.selectedProduct?.name} has been deleted!`);
      this.goBack()
    }
  }

  goBack() {
    this.productSubscription?.unsubscribe()
    this.router.navigateByUrl('/products');
  }
}
