import {Injectable} from '@angular/core';
import {ProductModelDisplay} from "../types/product-display.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {OrderModel} from "../types/order.model";
import {ProductModel} from "../types/product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  order: OrderModel = {products: []}

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get<ProductModelDisplay[]>(`${environment.url}/products`).pipe(
      catchError(this.handleError)
    );
  }

  getProductByID(id: string) {
    return this.http.get(`${environment.url}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url}/products/${id}`);
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

  actualizeOrder(selectedProductID: string, order: OrderModel) {
    if (selectedProductID !== undefined) {
      const productOrder = order.products.find(x => x.productId === selectedProductID);
      if (productOrder === undefined) {
        order.products.push({productId: selectedProductID, quantity: 1})
      } else {
        productOrder.quantity += 1;
      }
    }
    return this.getOrder();
  }

  getOrder() {
    return this.order;
  }

  saveOrder() {
    const data = {customer: localStorage.getItem("username"), products: this.order.products};
    this.order.products = [];
    return this.http.post(`${environment.url}/orders`, data, {responseType: 'text'});
  }

  updateProduct(newProduct: ProductModel) {
    return this.http.put(`${environment.url}/products/${newProduct.id}`, newProduct)
  }

  saveProduct(product: { name: any; category: any; price: any; image: any; description: any }) {
    return this.http.post(`${environment.url}/products`, product, {responseType: 'json'})
  }
}
