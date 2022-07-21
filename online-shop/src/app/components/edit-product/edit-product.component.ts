import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {Location} from "@angular/common";
import {ProductModel} from "../../types/product.model";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: ProductModel | undefined;
  id: string | null = this.route.snapshot.paramMap.get('id');
  form: FormGroup = this.fb.group({
    name: ["the name", [Validators.required, Validators.minLength(5)]],
    category: ["the category", [Validators.required]],
    image: ["the image", [Validators.required]],
    price: [0, [Validators.required]],
    description: ["the description", [Validators.required]]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient,
              private productService: ProductService, private location: Location) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProductByID(this.id).subscribe((data) => {
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
    this.location.back()
  }

  update() {
    if (this.product) {
      if (!this.form.invalid) {
        let newProduct: ProductModel = {
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
