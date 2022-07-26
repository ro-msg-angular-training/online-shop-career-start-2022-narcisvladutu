import {Injectable} from '@angular/core';
import {ProductModelDisplay} from "../types/product-display.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModel} from "../types/product.model";
import {environment} from "../../environments/environment";
import {ProductQuantityModel} from "../types/ProductQuantity.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<ProductModelDisplay[]> {
    return this.http.get<ProductModelDisplay[]>(`${environment.url}/products`)
  }

  getProductByID(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.url}/products/${id}`)
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.url}/products/${id}`);
  }

  saveOrder(products: ProductQuantityModel[]) {
    const data = {customer: localStorage.getItem("username"), products: products};
    return this.http.post(`${environment.url}/orders`, data, {responseType: 'text'});
  }

  updateProduct(newProduct: ProductModel) {
    return this.http.put(`${environment.url}/products/${newProduct.id}`, newProduct)
  }

  saveProduct(product: { name: any; category: any; price: any; image: any; description: any }): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${environment.url}/products`, product, {responseType: 'json'})
  }
}
