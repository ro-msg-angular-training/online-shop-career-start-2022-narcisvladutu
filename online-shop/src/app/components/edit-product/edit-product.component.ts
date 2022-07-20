import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient,
              private productService: ProductService, private location: Location) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProductByID(this.id).subscribe((data) => {
          this.product = <ProductModel>data;
          this.form = this.fb.group({
            name: this.product?.name,
            category: this.product?.category,
            image: this.product?.image,
            price: this.product.price,
            description: this.product?.description
          })
        }
      );
    }
  }

  goBack() {
    this.location.back()
  }

  update() {
    if(this.product) {
      let newProduct: ProductModel = {
        id: this.product?.id,
        name: this.product.name === this.form?.value.name ? this.product.name: this.form?.value.name,
        price: this.product.price === this.form?.value.price ? this.product.price: this.form?.value.price,
        image: this.product.image === this.form?.value.image ? this.product.image: this.form?.value.image,
        category: this.product.category === this.form?.value.category ? this.product.category: this.form?.value.category,
        description: this.product.description === this.form?.value.description ? this.product.description: this.form?.value.description
      }
      console.log(newProduct);
      this.productService.updateProduct(newProduct).subscribe(()=>{});
    }
    this.goBack();
  }
}