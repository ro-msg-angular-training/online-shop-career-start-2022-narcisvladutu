import {Injectable} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProductModel} from "../../types/product.model";
import {from, of} from 'rxjs';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  getProduct,
  getProductFailure,
  getProductSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
} from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private productsService: ProductService,
    private actions$: Actions
  ) {
  }

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((props) =>
        from(this.productsService.saveProduct(props.product)).pipe(
          map((product) => {
            return addProductSuccess({product: product});
          }),
          catchError((err) => of(addProductFailure({error: err})))
        )
      )
    )
  );

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProduct),
      switchMap((props) =>
        this.productsService.getProductByID(props.productId).pipe(
          map((product: ProductModel) => getProductSuccess({product: product})),
          catchError((err) => of(getProductFailure({error: err})))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap((props) =>
        this.productsService.updateProduct(props.product).pipe(
          map(() => updateProductSuccess()),
          catchError((err) => of(updateProductFailure({error: err})))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((props) =>
        this.productsService.deleteProduct(props.productId).pipe(
          map(() => deleteProductSuccess()),
          catchError((err) => of(deleteProductFailure({error: err})))
        )
      )
    )
  );
}
