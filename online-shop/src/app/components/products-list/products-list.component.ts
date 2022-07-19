import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../types/product.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {url} from "../../utils";
import {ProductModelDisplay} from "../../types/product-display.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<ProductModelDisplay[]> | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.products$ = this.http.get<ProductModelDisplay[]>(`${url}/products`);
  }
}
