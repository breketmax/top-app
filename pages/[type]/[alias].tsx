import axios from 'axios';
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { withLayout } from '../../layout/Layout';
import { TopPageComponent } from '../../page-components/TopPageComponent/TopPageComponent';
import {Error404} from "../404";

const Course = ({firstCategory, page,products}:CourseProps):JSX.Element => {
  if (!page || !products){
    return <Error404 />;
  }
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description"  content={page.metaDescription}/>
        <meta property="og:title" content={page.metaTitle}/>
        <meta property="og:description"  content={page.metaDescription}/>
        
      </Head>
      <TopPageComponent firstCategory={firstCategory} products={products} page={page} />
    </>
  );
};

export default withLayout(Course);

export const getStaticPaths:GetStaticPaths = async () => {
  let paths:string[] = [];
  for ( const s of  firstLevelMenu ){
    const {data:menu} =await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{
      firstCategory:s.id
    });
    paths = paths.concat(menu.flatMap(m => m.pages.map(p => `/${s.route}/${p.alias}`)));
  }
  return {
    paths,
    fallback:true
  };
};

export const getStaticProps:GetStaticProps<CourseProps> =  async({params}:GetStaticPropsContext<ParsedUrlQuery>) => {
  if(!params){
    return {
      notFound:true
    };
  }
  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
  if(!firstCategoryItem){
    return {
      notFound:true
    };
  }
  try{
    const {data:menu} = await axios.post<MenuItem[]>(API.topPage.find,{firstCategory:firstCategoryItem.id});
    console.log(menu);
    if(menu.length === 0){
      return{
        notFound:true
      };  
    }
    const {data:page} = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
    const {data:products} =await axios.post<ProductModel[]>(API.product.find,{
      "category":page.category,
      "limit":10
    });
    return {
      props:{
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  }catch{
    return{
      notFound:true
    };
  }
};

interface CourseProps extends Record<string,unknown>{
  menu:MenuItem[],
  firstCategory:TopLevelCategory,
  page:TopPageModel,
  products:ProductModel[]
}