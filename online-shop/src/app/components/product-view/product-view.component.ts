import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductModel} from "../../types/product.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel | undefined;
  id: string | null = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private http: HttpClient, private productService: ProductService,
              private location: Location) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProductByID(this.id).subscribe((data) => this.product = <ProductModel>data);
    }
  }

  deleteProduct() {
    if (this.id) {
      this.productService.deleteProduct(this.id).subscribe(() => {
        alert(`${this.product?.name} has been deleted!`);
        this.goBack()
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
