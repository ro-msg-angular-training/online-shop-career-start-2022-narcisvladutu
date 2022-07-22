import {createReducer, on} from "@ngrx/store";
import {initialProductState} from "../state/product.state";
import {
  addProduct,
  deleteProduct,
  loadProducts,
  loadProductsSuccess,
  loadTodosFailure
} from "../actions/product.actions";

export const productReducer = createReducer(
  initialProductState,
  on(addProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
  })),
  on(deleteProduct, (state, { id }) => ({
    ...state,
    todos: state.products.filter((product) => product.id !== id),
  })),
  // Trigger loading the todos
  on(loadProducts, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded todos
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
)
