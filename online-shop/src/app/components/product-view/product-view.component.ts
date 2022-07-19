import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductModel} from "../../types/product.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {url} from "../../utils";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel |undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
      // @ts-ignore
    this.http.get(`${url}/products/${this.route.snapshot.paramMap.get('id')}`).subscribe((data: ProductModel) => {
        this.product = data;
      })
  }
}
