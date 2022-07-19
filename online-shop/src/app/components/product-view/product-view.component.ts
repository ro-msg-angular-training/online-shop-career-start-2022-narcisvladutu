import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductModel} from "../../types/product.model";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel ={id:"0",name:"", category:"",price:0,description:"",image:""};

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.product.id = <string>this.route.snapshot.paramMap.get('id');
  }
}
