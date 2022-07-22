import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
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
    this.router.navigateByUrl('/products')
  }

  save() {
    if (this.form?.valid) {
      const product = this.form.value;

      this.productService.saveProduct(product).subscribe(() => {
        alert("THE NEW PRODUCT WAS SAVED!")
        this.goBack()
      });
    }else{
      alert("YOUR DATA AREN'T VALID !")
    }

  }

}
