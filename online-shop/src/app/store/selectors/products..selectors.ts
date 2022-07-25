import { createSelector } from '@ngrx/store';
import { AppState} from "../state/app.state";
import { IProductsState} from "../state/products.state";

export const selectProducts = (state: AppState) => state.products;
export const selectAllProducts = createSelector(
  selectProducts,
  (state: IProductsState) => state.products
);