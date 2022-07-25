import {AppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {OrderState} from "../state/order.state";

export const selectOrderState = (state: AppState) => state.order;

export const selectOrderProducts = createSelector(selectOrderState, (state: OrderState) => state.products);
