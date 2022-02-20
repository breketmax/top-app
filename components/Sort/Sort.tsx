import styles from "./Sort.module.scss";
import cn from "classnames";
import {sortEnum, SortProps} from "./Sort.props";
import SortIcon from "./sort.svg";

export const Sort = ({sort, setSort, className, ...props}:SortProps):JSX.Element => {
  return (
    <div className={cn(styles.sort,className)}> 
      <div onClick={()=> setSort(sortEnum.Rating)} className={cn(styles.sortElem,{
        [styles.activeElem]: sort === sortEnum.Rating
      })}>
        <SortIcon className={styles.sortIcon}/>
        По рейтингу
      </div>
      <div onClick={()=> setSort(sortEnum.Price)} className={cn(styles.sortElem,{
        [styles.activeElem]: sort === sortEnum.Price
      })}>
        <SortIcon className={styles.sortIcon}/>
          По цене
      </div>
    </div>
  );
};