import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {ProductModel} from "../../types/product.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: ProductModel | undefined;
  id: string | null = "";
  form: FormGroup = this.fb.group({
    name: ["the name", [Validators.required, Validators.minLength(5)]],
    category: ["the category", [Validators.required]],
    image: ["the image", [Validators.required]],
    price: [0, [Validators.required]],
    description: ["the description", [Validators.required]]
  });
  productSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient,
              private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.productSubscription = this.productService.getProductByID(this.id).subscribe((data) => {
          this.product = <ProductModel>data;
          this.form = this.fb.group({
            name: [this.product?.name, [Validators.required, Validators.minLength(5)]],
            category: [this.product?.category, [Validators.required]],
            image: [this.product?.image, [Validators.required]],
            price: [this.product.price, [Validators.required, Validators.pattern('^\\d+$')]],
            description: [this.product?.description, [Validators.required]]
          })
        }
      );
    }
  }

  goBack() {
    this.productSubscription?.unsubscribe();
    this.router.navigateByUrl('/products')
  }

  update() {
    if (this.product) {
      if (this.form.valid) {
        const newProduct: ProductModel = {
          id: this.product?.id,
          name: this.product.name === this.form?.value.name ? this.product.name : this.form?.value.name,
          price: this.product.price === this.form?.value.price ? this.product.price : this.form?.value.price,
          image: this.product.image === this.form?.value.image ? this.product.image : this.form?.value.image,
          category: this.product.category === this.form?.value.category ? this.product.category : this.form?.value.category,
          description: this.product.description === this.form?.value.description ? this.product.description : this.form?.value.description
        }
        this.productService.updateProduct(newProduct).subscribe(() => {
        });
      } else {
        alert("INTRODUCE CORRECT DATA!")
      }
    }
    this.goBack();
  }
}
