import { HhBlockProps } from "./HhBlock.props";
import styles from "./HhBlock.module.scss";
import cn from "classnames";
import { Htag, Tag } from "../..";
import RateIcon from "./rate.svg";
import { priceRegex } from "../../../helpers/helpers";

export const HhBlock = ({page}:HhBlockProps):JSX.Element => {
  return (
    <div className={styles.hhBlock}>
          <div className={styles.hhHeader}>
            <Htag tag="h2">Ваканcии - {page.category}</Htag>
            <Tag color="red" size="md">hh.ru</Tag>
          </div>
          <div className={styles.hhContent}>
            <div className={styles.hhCard}>
              <div className={styles.vacancyCard}>
              Всего вакансий
              <p>{priceRegex(page.hh.count,false)}</p>
              </div>
            </div>
            <div className={cn(styles.hhCard, styles.salaryCards)}>
              <div className={styles.salaryCard}>
                Начальный
                <p>{priceRegex(page.hh.juniorSalary,true)}</p>
                <RateIcon className={styles.hhFilled}/>
                <RateIcon />
                <RateIcon />
              </div>
              <div className={styles.salaryCard}>
                Средний
                <p>{priceRegex(page.hh.middleSalary,true)}</p>
                <RateIcon className={styles.hhFilled}/>
                <RateIcon className={styles.hhFilled} />
                <RateIcon />
              </div>
              <div className={styles.salaryCard}>
                Профессионал
                <p>{priceRegex(page.hh.seniorSalary,true)}</p>
                <RateIcon className={styles.hhFilled}/>
                <RateIcon className={styles.hhFilled}/>
                <RateIcon className={styles.hhFilled}/>
              </div>
            </div>
          </div>
        </div>
  );
};