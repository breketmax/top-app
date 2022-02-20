import { sortEnum } from "../../components/Sort/Sort.props";
import { ProductModel } from "../../interfaces/product.interface";

export type SortActions = {type:sortEnum.Price} | {type:sortEnum.Rating} | {type:"NEW_PRODUCTS",payload:ProductModel[]};

export interface SortProps{
  sort:sortEnum,
  products:ProductModel[]
}

export const sortReducer = (state:SortProps,action:SortActions):SortProps => {
  switch(action.type){
    case sortEnum.Price:{
      const newProducts= [...state.products];
      return {
        sort:sortEnum.Price,
        products:newProducts.sort((a,b) => a.price > b.price ? 1 : -1)
      };
    }
    case sortEnum.Rating:{
      const newProducts= [...state.products];
      return{
        sort:sortEnum.Rating,
        products:newProducts.sort((a,b)=> a.initialRating > b.initialRating ? -1 :1)
      };
    }
    case "NEW_PRODUCTS":{
      return{
        sort:sortEnum.Rating,
        products:action.payload
      };
    }
      default:
        throw new Error("Undefined sort");
  }
};