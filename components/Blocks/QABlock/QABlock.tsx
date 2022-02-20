import { QABlockProps } from "./QABlock.props";
import styles from "./QABlock.module.scss";
import { Htag } from "../..";


export const QABlock = ({page}:QABlockProps):JSX.Element => {
  return (
    <div className={styles.qaBlock}>
      <Htag tag="h2">Частые вопросы</Htag>
      <div className={styles.questions}>
        {page.qas.map((q,i) => (
          <div key={i} className={styles.qa}>
            <Htag tag="h3" >{q.question}</Htag>
            <div className={styles.answer}  dangerouslySetInnerHTML={{__html:q.answer.replace(/\n/g,"<br />")}}/>
          </div>
        ))}
      </div>
    </div>
  );
};