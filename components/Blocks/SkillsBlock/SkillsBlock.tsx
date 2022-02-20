import { SkillsBlockProps } from "./SkillsBlock.props";
import styles from "./SkillsBlock.module.scss";
import { Htag, Tag } from "../..";


export const SkillsBlock = ({page}:SkillsBlockProps):JSX.Element => {
  return (
    <div className={styles.skillsBlock}>
      <Htag tag="h2">Навыки</Htag>
      <div className={styles.skills}>
        {page.tags.map(s => (
          <Tag key={s} color="primary" size="sm">{s}</Tag>
        ))}
      </div>
    </div>
  );
};