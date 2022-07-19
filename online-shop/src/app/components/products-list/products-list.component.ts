import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../types/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.products.push({id: "1", name: "banane", category: "fructe",
      image: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg", price: 2,
      description: "descriere"}, {id: "1", name: "banane", category: "fructe",
      image: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg", price: 2,
      description: "descriere"});
  }
}
