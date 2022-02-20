import CoursesIcon from "./courses.svg";
import BooksIcon from "./books.svg";
import ServicesIcon from "./services.svg";
import ProductsIcon from "./products.svg";
import { TopLevelCategory } from "../interfaces/page.interface";
import { FirstLevelMenuItem } from "../interfaces/menu.interface";

export const firstLevelMenu:FirstLevelMenuItem[] = [
  {route:"courses", name:"Курсы", icon: <CoursesIcon/>, id:TopLevelCategory.Courses},
  {route:"services", name:"Сервисы", icon: <ServicesIcon/>, id:TopLevelCategory.Services},
  {route:"books", name:"Книги", icon: <BooksIcon/>, id:TopLevelCategory.Books},
  {route:"products", name:"Товары", icon: <ProductsIcon/>, id:TopLevelCategory.Products},
];

export const priceRegex =(price:number,isPrice:boolean):string =>  {
  if(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(isPrice? " ₽": "");
  }
  else{
    return "0";
  }
};


export const declination = (count:number):string => {
  const declArr:string[]= ["отзыв","отзыва","отзывов"];
  if(count % 100 === 11){
    return declArr[2];
  }else if(count % 10 === 1){
    return declArr[0];
  }else if(count % 10 === 2 || count % 10 === 3 || count % 10 === 4){
    return declArr[1];
  }
  else{
    return declArr[2];
  }


};