import {ProductModel} from "../../types/product.model";
import {ProductViewComponent} from "../../components/product-view/product-view.component";
import {ProductModelDisplay} from "../../types/product-display.model";

export interface IProductState {
  products: ProductModelDisplay[];
  error: string | null,
  status: 'pending'|'loading'|'error'|'success'
}

export const initialProductState: IProductState ={
  products: [],
  error: null,
  status: "pending"
}
