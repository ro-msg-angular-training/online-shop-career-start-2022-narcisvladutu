import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductModel} from "../../types/product.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {url} from "../../utils";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel |undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProductByID(this.route).subscribe((data)=>this.product=<ProductModel>data);
  }
}
