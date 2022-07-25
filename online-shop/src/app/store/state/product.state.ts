import {ProductModel} from "../../types/product.model";

export interface ProductState {
  currentProduct: ProductModel | null;
  error: string | null,
  status: 'pending'|'loading'|'error'|'success'
}

export const initialProductState: ProductState ={
  currentProduct: null,
  error: null,
  status: 'pending'
}
