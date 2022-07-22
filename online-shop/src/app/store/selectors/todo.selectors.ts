import { createSelector } from '@ngrx/store';
import { AppState} from "../state/app.state";
import { IProductState} from "../state/product.state";

export const selectProducts = (state: AppState) => state.products;
export const selectAllProducts = createSelector(
  selectProducts,
  (state: IProductState) => state.products
);
