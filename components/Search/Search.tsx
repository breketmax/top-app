import { SearchProps } from "./Search.props";
import styles from "./Search.module.scss";
import cn from "classnames";
import { Button, Input } from "..";
import SearchIcon from "./search.svg";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";

export const Search = ({className,...props}:SearchProps):JSX.Element => {
  const [inputValue,setInputValue] = useState<string>("");
  const router = useRouter();
  const searchHandle = () => {
    router.push({
      pathname:"/search",
      query:{
        q: inputValue
      }
    });
  };
  const keyHandle = (e:KeyboardEvent):void => {
    if(e.key === "Enter"){
      searchHandle();
    } 
  };
  return (
    <div className={cn(className, styles.searchField)} {...props}> 
      <Input
      placeholder="Поиск..."
      className={styles.searchInput}
      value={inputValue}
      onChange={(e)=> setInputValue(e.target.value)}
      onKeyDown={keyHandle}
      />
      <Button 
      appearance="primary" 
      arrow="none" 
      className={styles.searchButton}
      onClick={searchHandle}
      >
        <SearchIcon/>
      </Button>
    </div>
  );
};