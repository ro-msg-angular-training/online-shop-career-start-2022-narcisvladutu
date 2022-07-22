import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from "../../types/product.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel | undefined;
  id: string | null = "";
  hasAuthorisationOfAdmin: boolean = false;
  productSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, private productService: ProductService,
              private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productSubscription = this.productService.getProductByID(this.id).subscribe((data) => this.product = <ProductModel>data);
    }
    this.hasAuthorisationOfAdmin = this.userService.hasRoleType("admin");
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
    this.productSubscription?.unsubscribe()
    this.router.navigateByUrl('/products');
  }
}
