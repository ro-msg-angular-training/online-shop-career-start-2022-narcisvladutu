import { Injectable } from '@angular/core';
import {ProductModelDisplay} from "../types/product-display.model";
import {url} from "../utils";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<ProductModelDisplay[]>(`${url}/products`).pipe(
      catchError(this.handleError)
    );;
  }

  getProductByID(route: ActivatedRoute){
    return this.http.get(`${url}/products/${route.snapshot.paramMap.get('id')}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(route: ActivatedRoute){

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
}
