import { motion, useAnimation} from "framer-motion";
import { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Up.module.scss";

export const Up = ():JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(()=>{
    controls.start({opacity:y*4/document.body.scrollHeight});
  },[controls,y]);

  const scrollToTop =() => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  };
  return (
    <motion.div className={styles.up} animate={controls} initial={{opacity:0}}>
      <ButtonIcon onClick={scrollToTop} appearance="primary" icon="up"/>
    </motion.div>
  );
};