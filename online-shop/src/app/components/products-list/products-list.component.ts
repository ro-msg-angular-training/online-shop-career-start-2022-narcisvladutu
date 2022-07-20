import {Component, DoCheck, OnInit} from '@angular/core';
import {ProductModel} from "../../types/product.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {url} from "../../utils";
import {ProductModelDisplay} from "../../types/product-display.model";
import {Observable} from "rxjs";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit{
  products: ProductModelDisplay[] | undefined;

  constructor(private productService: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => this.products = data)
  }
}
