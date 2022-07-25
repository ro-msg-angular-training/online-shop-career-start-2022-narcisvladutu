import {Injectable} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProductModel} from "../../types/product.model";
import {from, of, tap} from 'rxjs';
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
import {Router} from "@angular/router";

@Injectable()
export class ProductEffects {
  constructor(
    private productsService: ProductService,
    private actions$: Actions,
    private router: Router
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

  addProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProductSuccess),
        tap(({product: product}) => {
          alert(`${product.name} was added!`);
          this.router.navigateByUrl('/products');
        })
      ),
    { dispatch: false }
  );

  addProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProductFailure),
        tap(() => {
          alert('ADDED FAILED');
        })
      ),
    { dispatch: false }
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

  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProductSuccess),
        tap(() => {
          alert('Successfully updated!');
          this.router.navigateByUrl('/products');
        })
      ),
    { dispatch: false }
  );

  updateProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProductFailure),
        tap(() => {
          alert('UPDATE FAILED');
        })
      ),
    { dispatch: false }
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

  deleteProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProductSuccess),
        tap(() => {
          alert('Successfully deleted!');
          this.router.navigateByUrl('/products');
        })
      ),
    { dispatch: false }
  );

  deleteProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProductFailure),
        tap(() => {
          alert('DELETED FAILED');
        })
      ),
    { dispatch: false }
  );
}
