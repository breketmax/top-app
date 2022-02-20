export enum TopLevelCategory{
  Courses,
  Services,
  Books,
  Products
}


export interface HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
  _id: string;
}
export interface TopPageAdvantage{
  _id:string;
  title:string;
  description:string;
}
export interface TopPageModel {
  _id: string;
  tags: string[];
  firstCategory: TopLevelCategory;
  secondCategory: string;
  alias: string;
  title: string;
  seoText:string;
  category: string;
  categoryOn: string;
  tagsTitle: string;
  metaTitle: string;
  metaDescription: string;
  advantages: TopPageAdvantage[];
  qas: any[];
  addresses: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  hh: HhData;
}