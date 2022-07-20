import {ProductQuantityModel} from "./ProductQuantity.model";

export interface OrderModel{
  //customer: string
  products: ProductQuantityModel[];
}
