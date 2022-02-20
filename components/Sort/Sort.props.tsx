import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>{
  sort:sortEnum,
  setSort:(sort:sortEnum)=>void
}

export enum sortEnum{
  Rating,
  Price
}