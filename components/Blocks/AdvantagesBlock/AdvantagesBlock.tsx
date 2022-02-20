import { Htag,P } from "../..";
import styles from "./AdvantagesBlock.module.scss";
import { AdvantagesBlockProps } from "./AdvantagesBlock.props";
import AdvantageIcon from "./advantage.svg";

export const AdvantagesBlock = ({page}:AdvantagesBlockProps):JSX.Element => {
  return (
  <>
    <div className={styles.advantagesBlock}> 
      <Htag tag="h2">Преимущества</Htag>
      {page.advantages.map(a => (
        <div key={a._id} className={styles.advantage}>
          <div className={styles.advantageTitle}>
            <AdvantageIcon />
            {a.title}
          </div>
          <div className={styles.advantageDescription}>
            <P size="lg">{a.description}</P>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};