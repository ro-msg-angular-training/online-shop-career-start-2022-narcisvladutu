import {ProductQuantityModel} from "../../types/ProductQuantity.model";

export interface OrderState {
  products: ProductQuantityModel[];
  error: string | null,
  status: 'pending'|'loading'|'error'|'success'
}

export const initialOrderState: OrderState = {
  products: [],
  status: "pending",
  error: "",
};
