import {createReducer, on} from "@ngrx/store";
import {
  addProduct, addProductFailure, addProductSuccess,
  deleteProduct, deleteProductFailure, deleteProductSuccess,
  getProduct,
  getProductFailure,
  getProductSuccess,
  updateProduct, updateProductFailure,
  updateProductSuccess
} from "../actions/product.actions";
import {initialProductState} from "../state/product.state";

export const productReducer = createReducer(
  initialProductState,

  on(getProduct, (state) => ({
    ...state,
    status: "loading"
  })),

  on(getProductSuccess, (state, {product}) => ({
    ...state,
    currentProduct: product,
    status: "success",
    error: null,
  })),

  on(getProductFailure, (state) => ({
    ...state,
    status: "error",
    error: null,
  })),

  on(updateProduct, (state) => ({
    ...state,
    status: "loading"
  })),

  on(updateProductSuccess, (state) => ({
    ...state,
    currentProduct: null,
    status: "success",
    error: null,
  })),

  on(updateProductFailure, (state) => ({
    ...state,
    status: "error",
    error: null,
  })),

  on(deleteProduct, (state) => ({
    ...state,
    status: "loading"
  })),

  on(deleteProductSuccess, (state) => ({
    ...state,
    currentProduct: null,
    status: "success",
    error: null,
  })),

  on(deleteProductFailure, (state) => ({
    ...state,
    status: "error",
    error: null,
  })),

  on(addProduct, (state) => ({
    ...state,
    status: "loading"
  })),

  on(addProductFailure, (state) => ({
    ...state,
    status: "error",
    error: null,
  })),

  on(addProductSuccess, (state) => ({
    ...state,
    currentProduct: null,
    status: "success",
    error: null,
  })),
);
