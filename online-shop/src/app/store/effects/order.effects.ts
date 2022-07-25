import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductService} from "../../services/product.service";
import {catchError, map, of, tap} from "rxjs";
import {actualizeOrder, saveOrder, saveOrderFailure, saveOrderSuccess} from "../actions/order.actions";
import {switchMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class OrderEffects {
  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  actualizeOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actualizeOrder),
        tap(() =>
          alert('Your order has been actualized!'))
      ),
    {dispatch: false}
  )

  saveOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveOrder),
      switchMap((props) =>
        this.productService.saveOrder(props.products).pipe(
          map(() => saveOrderSuccess()),
          catchError((err) => of(saveOrderFailure({error: err})))
        )
      )
    )
  );

  saveOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveOrderSuccess),
        tap(() => {
          alert("YOUR ORDER HAS BEEN PLACED!");
          this.router.navigateByUrl('/products').then();
        })
      ),
    { dispatch: false }
  );

  saveOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveOrderFailure),
        tap(() => {
          alert('ORDER FAILURE');
        })
      ),
    { dispatch: false }
  );
}
