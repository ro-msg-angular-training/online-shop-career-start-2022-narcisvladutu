import {createReducer, on} from "@ngrx/store";
import {initialProductsState} from "../state/products.state";
import {
  loadProducts,
  loadProductsSuccess,
  loadTodosFailure
} from "../actions/products.actions";

export const productsReducer = createReducer(
  initialProductsState,
  on(loadProducts, (state) => ({...state, status: 'loading'})),
  // Handle successfully loaded todos
  on(loadProductsSuccess, (state, {products}) => ({
    ...state,
    products: products,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTodosFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  }))
)
