import {ProductModelDisplay} from "../../types/product-display.model";

export interface IProductsState {
  products: ProductModelDisplay[];
  error: string | null,
  status: 'pending'|'loading'|'error'|'success'
}

export const initialProductsState: IProductsState ={
  products: [],
  error: null,
  status: 'pending'
}
