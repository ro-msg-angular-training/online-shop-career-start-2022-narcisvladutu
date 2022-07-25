import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../../types/product.model";
import {Subscription} from "rxjs";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {selectCurrentProduct} from "../../store/selectors/product.selectors";
import {updateProduct} from "../../store/actions/product.actions";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  selectedProduct: ProductModel | null = null;
  id: string | null = "";
  form: FormGroup = this.fb.group({
    name: ["the name", [Validators.required, Validators.minLength(5)]],
    category: ["the category", [Validators.required]],
    image: ["the image", [Validators.required]],
    price: [0, [Validators.required]],
    description: ["the description", [Validators.required]]
  });
  productSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.productSubscription = this.store.select(selectCurrentProduct).subscribe((data) => {
        this.selectedProduct = data;
        this.form = this.fb.group({
          name: [this.selectedProduct?.name, [Validators.required, Validators.minLength(5)]],
          category: [this.selectedProduct?.category, [Validators.required]],
          image: [this.selectedProduct?.image, [Validators.required]],
          price: [this.selectedProduct?.price, [Validators.required, Validators.pattern('^\\d+$')]],
          description: [this.selectedProduct?.description, [Validators.required]]
        })
      })
    }
  }

  goBack() {
    this.productSubscription?.unsubscribe();
    this.router.navigateByUrl('/products')
  }

  update() {
    if (this.selectedProduct) {
      if (this.form.valid) {
        const newProduct: ProductModel = {
          id: this.selectedProduct?.id,
          name: this.selectedProduct.name === this.form?.value.name ? this.selectedProduct.name : this.form?.value.name,
          price: this.selectedProduct.price === this.form?.value.price ? this.selectedProduct.price : this.form?.value.price,
          image: this.selectedProduct.image === this.form?.value.image ? this.selectedProduct.image : this.form?.value.image,
          category: this.selectedProduct.category === this.form?.value.category ? this.selectedProduct.category : this.form?.value.category,
          description: this.selectedProduct.description === this.form?.value.description ? this.selectedProduct.description : this.form?.value.description
        }
        this.store.dispatch(updateProduct({product: newProduct}))
      } else {
        alert("INTRODUCE CORRECT DATA!")
      }
    }
  }
}
