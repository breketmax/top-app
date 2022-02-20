import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";
import cn from "classnames";
import { motion } from "framer-motion";
import Logo from "../logo.svg";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Header = ({className,...props}:HeaderProps):JSX.Element => {
  const [isOpened,setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const variants = {
    opened:{
      opacity:1,
      x:0,
      zIndex:10,
      scale:1,
      transition:{
        type:"spring",
        stiffness:90
      }
    },
    closed:{
      opacity:0,
      x:0,
      scale:0,
      zIndex:-1
    }
  };
  useEffect(()=>{
    setIsOpened(false);
  },[router]);
  return (
    <header {...props}
    className={cn(className,styles.header)}
    >
      <Logo />
      <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpened(true)}/>
      <motion.div className={styles.mobileMenu} variants={variants} initial={"closed"} animate= {isOpened ? "opened" : "closed"}>
        <ButtonIcon className={styles.close} appearance="white" icon="close" onClick={() => setIsOpened(false)} />
        <Sidebar />
      </motion.div>

    </header>
  );
};