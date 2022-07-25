import {createReducer, on} from "@ngrx/store";
import {initialOrderState} from "../state/order.state";
import {
  actualizeOrder,
  saveOrder,
  saveOrderFailure,
  saveOrderSuccess
} from "../actions/order.actions";
import {ProductQuantityModel} from "../../types/ProductQuantity.model";

export const orderReducer = createReducer(
    initialOrderState,

    on(actualizeOrder, (state, {productID}) => {
      const productOrder = state.products.find(x => x.productId === productID);
      if (productOrder === undefined) {
        return {
          ...state,
          products: [...state.products, {productId: productID, quantity: 1}],
          status: "success",
          error: "",
        };
      } else {
        const item: ProductQuantityModel = {productId: productID, quantity: productOrder.quantity+1}
        const items = state.products.filter((product) => product.productId !== productOrder.productId);
        return {
          ...items,
          products: [...items, item],
          status: "success",
          error: "",
        };
      }
    }),

    on(saveOrder, (state) => ({
      ...state,
      status: "loading",
    })),

    on(saveOrderSuccess, (state) => ({
      ...state,
      products: [],
      status: "success",
      error: "",
    })),

    on(saveOrderFailure, (state) => ({
      ...state,
      status: "error",
      error: "",
    }))
  )
;
