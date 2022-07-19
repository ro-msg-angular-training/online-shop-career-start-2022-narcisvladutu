import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../types/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  public product: ProductModel ={id:"0",name:"", category:"",price:0,description:"",image:""};

  constructor() {}

  ngOnInit(): void {
  }

}
