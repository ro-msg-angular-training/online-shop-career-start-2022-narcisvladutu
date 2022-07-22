// import {Action} from "@ngrx/store";
// import {ProductModel} from "../../types/product.model";
//
// export enum EProductActions {
//   GetProducts = '[Product] Get Products',
//   GetProductsSuccess = '[Product] Get Products Success',
//   GetProduct = '[Product] Get Product',
//   GetProductSuccess = '[Product] Get Product Success'
// }
//
// export class GetProducts implements Action {
//   public readonly type = EProductActions.GetProducts;
// }
//
// export class GetProductsSuccess implements Action {
//   public readonly type = EProductActions.GetProductsSuccess;
//
//   constructor(public payload: ProductModel[]) {
//   }
// }
//
// export class GetProductSuccess implements Action {
//   public readonly type = EProductActions.GetProductSuccess;
//
//   constructor(public payload: ProductModel) {
//   }
// }
//
//
// export class GetProduct implements Action {
//   public readonly type = EProductActions.GetProduct;
//
//   constructor(public payload: number) {
//   }
// }
//
// export type ProductActions =  GetProduct | GetProducts | GetProductsSuccess | GetProductSuccess

import {createAction, props} from "@ngrx/store";
import {ProductModel} from "../../types/product.model";
import {ProductModelDisplay} from "../../types/product-display.model";

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: ProductModel }>()
)

export const deleteProduct = createAction(
  '[Product] Add Product',
  props<{ id: string }>()
)

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
