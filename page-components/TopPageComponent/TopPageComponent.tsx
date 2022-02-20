import styles from "./TopPageComponent.module.scss";
import cn from "classnames";
import { TopPageProps } from "./TopPageComponent.props";
import { HhBlock, Htag, Tag, SkillsBlock, AdvantagesBlock,QABlock, Sort } from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { sortEnum } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { Product } from "../../components/Product/Product";
import { useScrollY } from "../../hooks/useScrollY";


export const TopPageComponent = ({firstCategory,page,products}:TopPageProps):JSX.Element => {
  const [{products:sortedProducts,sort},dispatchSort] = useReducer(sortReducer,{sort:sortEnum.Rating,products});
  const setSort = (sort:sortEnum) => {
    dispatchSort({type:sort});
  };
  useEffect(()=>{
    dispatchSort({type:"NEW_PRODUCTS",payload:products});
  },[products]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPageHeader}>
        <Htag tag="h1">{page.title}</Htag>
        {sortedProducts && <Tag color="gray" size="md">{sortedProducts.length}</Tag>}
        <Sort className={styles.sort} sort={sort} setSort={setSort}/>
      </div>
      <div className={styles.products}>
        {sortedProducts && sortedProducts.map(p => <Product layout key={p._id} product={p} />)}
      </div>
      {firstCategory === TopLevelCategory.Courses && <HhBlock page={page}/>}
      {page.advantages.length > 0 && <AdvantagesBlock page={page}/>}
      {page.seoText && <div className={styles.productDedcription} dangerouslySetInnerHTML={{__html:page.seoText}}/>}
      {page.qas.length >0 && <QABlock page={page} />}
      <SkillsBlock page={page}/>
    </div>
  );
};