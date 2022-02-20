
import styles from "./Menu.module.scss";
import cn from "classnames";
import { useContext,KeyboardEvent } from "react";
import { AppContext } from "../../context/app.context";
import { PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import {motion} from "framer-motion";

export const Menu = ():JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter(); 
  const openSecondLevel = (secondCat:string) => {
    setMenu && setMenu(menu.map(m => {
      if(m._id.secondCategory === secondCat){
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };
  const openSecondLevelKey = (key:KeyboardEvent,secondCat:string) => {
    if (key.code == "Enter" || key.code == "Space"){
      key.preventDefault();
      openSecondLevel(secondCat);
    }
  };
  const variants = {
    visible:{
      height:"auto",
      marginBottom:20,
      marginTop:20,
      transition:{
        when:"beforeChildren",
        staggerChildren:0.1
      }
    },
    hidden:{
     height:0,
     marginBottom:0,
     marginTop:0,
    }
  };
  const variantsChildren = {
    visible:{
      opacity:1,
      x:0,
      height:"auto"
    },
    hidden:{
      opacity:0,
      x:-100,
      height:0
    } 
  };

  const buildFirstLevel = () => {
    return (
      <ul>
        {
          firstLevelMenu.map(m => (
            <li key={m.route} className={cn(styles.firstLevel,{[styles.firstLevelActive]: firstCategory === m.id})}>
              <Link href={`/${m.route}`}>
                <a >
                  {m.icon}
                <span>{m.name}</span>
              </a>
              </Link>
              {firstCategory === m.id && buildSecondLevel(m.route)}
            </li>
          ))
        }
      </ul>
    );
  };
  const buildSecondLevel = (route:string) => {
    return(
      <ul className={styles.secondLevelBlock}>
        {
          menu.map(m => {
            if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])){
              m.isOpened = true;
            }
            return (
              <li key={m._id.secondCategory} className={cn(
                styles.secondLevel
              )}>
                <a onKeyDown={(key:KeyboardEvent)=> openSecondLevelKey(key,m._id.secondCategory)} tabIndex={0} onClick={() => openSecondLevel(m._id.secondCategory)}>
                  {m._id.secondCategory.toUpperCase()}
                </a>
                {buildThirdLevel(m.pages,route, m.isOpened)}
              </li>
            );
          })
        }
      </ul>
    );
  };
  const buildThirdLevel = (pages:PageItem[], route:string,opened:boolean) => {
    return(
      <motion.ul
        layout
        variants={variants}
        initial={"hidden"}
        animate={opened ? "visible" : "hidden"}
      >
        {
          pages.map(p => (
            <motion.li variants={variantsChildren} key={p.alias} className={cn(styles.thirdLevel,{
              [styles.thirdLevelActive]:`/${route}/${p.alias}` === router.asPath
            })}>
              <Link href={`/${route}/${p.alias}`}>
                <a tabIndex={opened ? 0 : -1}>
                  {p.category}
                </a>            
              </Link>
            </motion.li>
          ))
        }
      </motion.ul>
    );
  };
  return (
    <div className={styles.menuBlock}>
      {buildFirstLevel()}
    </div>
  );
};