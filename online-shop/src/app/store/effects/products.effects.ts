import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadProductsSuccess, loadProducts, loadTodosFailure
} from "../actions/products.actions";
import {ProductService} from "../../services/product.service";
import {of, from} from 'rxjs';
import {switchMap, map, catchError, withLatestFrom} from 'rxjs/operators';
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

  // Run this code when a loadTodos action is dispatched
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.productService.getAllProducts()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((products) => loadProductsSuccess({products: products})),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadTodosFailure({error})))
        )
      )
    )
  );
}
