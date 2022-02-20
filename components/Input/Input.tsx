import { InputProps } from "./Input.props";
import styles from "./Input.module.scss";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(({error,className,...props}:InputProps,ref:ForwardedRef<HTMLInputElement>):JSX.Element => {
  return (
    <div className={cn(className,styles.inputWrapper)}>
      <input ref={ref} className={cn(styles.input,{[styles.error]:error})} {...props}/>
      {error && <span className={styles.errorMsg}>{error.message}</span>}
    </div>
  );
});