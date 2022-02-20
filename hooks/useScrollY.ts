import { useEffect, useState } from "react";



export const useScrollY = () => {
  const isBrowser = typeof window !== "undefined";
  const [scroll,setScroll] = useState(0);
  const handleScroll = () => {
    const currentScrolY = isBrowser ? window.scrollY : 0;
    setScroll(currentScrolY);
  };
  useEffect(()=>{

    const addListener =() => {    
      window.addEventListener("scroll", handleScroll);
    };
    addListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[]);
  return scroll;
};