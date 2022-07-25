import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadProductsSuccess, loadProducts, loadTodosFailure
} from "../actions/products.actions";
import {ProductService} from "../../services/product.service";
import {of, from} from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from "../state/app.state";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        from(this.productService.getAllProducts()).pipe(
          map((products) => loadProductsSuccess({products: products})),
          catchError((error) => of(loadTodosFailure({error})))
        )
      )
    )
  );
}
