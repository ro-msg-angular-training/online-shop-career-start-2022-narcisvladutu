import {createAction, props} from "@ngrx/store";
import {ProductQuantityModel} from "../../types/ProductQuantity.model";

export const actualizeOrder = createAction('[ADD PRODUCT] Add Product To Order', props<{ productID: string }>());

export const saveOrder = createAction('[Checkout] Checkout', props<{ products: ProductQuantityModel[] }>());

export const saveOrderSuccess = createAction('[Checkout] Checkout Success');

export const saveOrderFailure = createAction('[Checkout] Checkout Failure', props<{ error: string }>());
