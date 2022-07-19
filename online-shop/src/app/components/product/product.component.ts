import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../types/product.model";
import {ProductModelDisplay} from "../../types/product-display.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  public product: ProductModelDisplay ={id:"0",name:"", category:"",price:0};

  constructor() {}

  ngOnInit(): void {
  }
}
