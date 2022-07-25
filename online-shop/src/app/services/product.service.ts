import {Injectable} from '@angular/core';
import {ProductModelDisplay} from "../types/product-display.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {OrderModel} from "../types/order.model";
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
    return this.http.get<ProductModelDisplay[]>(`${environment.url}/products`).pipe(
      catchError(this.handleError)
    );
  }

  getProductByID(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.url}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.url}/products/${id}`);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  saveOrder(products: ProductQuantityModel[]){
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
