import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private productService: ProductService, private location: Location) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      category: ["", [Validators.required]],
      image: ["", [Validators.required]],
      price: [0, [Validators.required, Validators.pattern('^\\d+$')]],
      description: ["", [Validators.required]]
    })
  }

  goBack() {
    this.location.back()
  }

  save() {
    const product = {
      name: this.form?.value.name,
      category: this.form?.value.category,
      price: this.form?.value.price,
      image: this.form?.value.image,
      description: this.form?.value.description,
    };

    this.productService.saveProduct(product).subscribe(() => {
      alert("THE NEW PRODUCT WAS SAVED!")
      this.goBack()
    });

  }

}
