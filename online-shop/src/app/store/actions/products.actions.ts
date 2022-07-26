import {createAction, props} from "@ngrx/store";
import {ProductModelDisplay} from "../../types/product-display.model";

export const loadProducts = createAction(
  '[Product] Load Products'
)

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: ProductModelDisplay[] }>()
);

export const loadTodosFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);
