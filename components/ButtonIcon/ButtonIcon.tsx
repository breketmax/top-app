import { ButtonProps, icons } from "./ButtonIcon.props";
import styles from "./ButtonIcon.module.scss";
import cn from "classnames";

export const ButtonIcon = ({appearance,icon,className,...props}:ButtonProps):JSX.Element => {
  const IconComp = icons[icon];
  return (
    <button className={cn(styles.button,className,{
      [styles.primary] : appearance === "primary",
      [styles.white] : appearance === "white"
    })}
    {...props}
    >
      <IconComp/>
    </button>
  );
};