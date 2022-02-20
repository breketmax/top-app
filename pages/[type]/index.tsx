import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { Htag } from "../../components";
import { firstLevelMenu } from "../../helpers/helpers";
import { FirstLevelMenuItem, MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { withLayout } from "../../layout/Layout";
import CoursesIcon from "./courses.svg";
import styles from "./TypePage.module.scss";

const TypePage = ({menu,firstCategory}:TypeProps):JSX.Element => {
const activeCategory = firstLevelMenu.filter(m => m.id=== firstCategory);
  return (
    <div className={styles.cardPage}>
      <div className={styles.cardHead}>
        {activeCategory[0].icon}
        <Htag tag="h1">{activeCategory[0].name}</Htag>
      </div>
    <div className={styles.cardBlock}>
      {menu.map(m => (
        <div className={styles.card} key={m._id.secondCategory}>
          <Htag tag="h2">{m._id.secondCategory}</Htag>
          <ul>
            {m.pages.map(p => (
              <li key={p.alias}>
                <Link href={`/${activeCategory[0].route}/${p.alias}`}>
                  <a className={styles.cardLink}>
                    {p.category}
                  </a>
                </Link>
              </li>
            ))}
          </ul>  
        </div>
      ))}
    </div>  
    </div>
  );
};

export default withLayout(TypePage);

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths:firstLevelMenu.map(m => `/${m.route}`),
    fallback:true
  };
};

export const getStaticProps:GetStaticProps<TypeProps> = async({params}:GetStaticPropsContext<ParsedUrlQuery>) => {
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
  const {data:menu} =await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{firstCategory:firstCategoryItem.id});
  return {
    props:{
      menu,
      firstCategory:firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string,unknown>{
  menu:MenuItem[],
  firstCategory:number
}