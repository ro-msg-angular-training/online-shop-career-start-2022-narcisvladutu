import { IProductsState} from "./products.state";
import {ProductState} from "./product.state";

export interface AppState {
  products: IProductsState;
  product: ProductState
}
