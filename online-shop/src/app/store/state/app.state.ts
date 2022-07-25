import { IProductsState} from "./products.state";
import {ProductState} from "./product.state";
import {AuthState} from "./auth.state";
import {OrderState} from "./order.state";

export interface AppState {
  products: IProductsState;
  product: ProductState;
  auth: AuthState;
  order: OrderState
}
