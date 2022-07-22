import {ProductModelDisplay} from "./product-display.model";

export interface ProductModel extends ProductModelDisplay {
  image: string;
  description: string;
}
