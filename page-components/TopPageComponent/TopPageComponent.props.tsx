import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface TopPageProps extends Record<string,unknown>{
  firstCategory:TopLevelCategory,
  page:TopPageModel,
  products:ProductModel[]
}
