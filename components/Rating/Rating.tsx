import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.scss";
import cn from "classnames";
import { useEffect, useState,KeyboardEvent, forwardRef, ForwardedRef } from "react";
import StarIcon from "./star.svg";

export const Rating = forwardRef(({error,isEditable=false,rating,setRating=undefined,className,...props}:RatingProps,ref:ForwardedRef<HTMLDivElement>):JSX.Element => {
  const [ratingArray,setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
      fillRating(rating);
  },[rating]);

  const fillRating = (currentRating:number) => {
    const filledRatingArray = ratingArray.map((r:JSX.Element, i:number)=>{
      return(
        <span
        onMouseEnter={()=> changeDisplay(i+1)}
        onMouseLeave={()=> changeDisplay(rating)}
        onClick = {() => changeRating(i+1)}
        className={
          cn(styles.star,{
            [styles.filled]: i < currentRating,
            [styles.editable] : isEditable
          })
        }
        >
          <StarIcon 
          tabIndex={isEditable ? 0: -1}
          onKeyDown = { (e:KeyboardEvent<SVGElement>) => handleSpace(i+1,e)}
        />
        </span>
      );
    });
    setRatingArray(filledRatingArray);
  };

  const changeDisplay = (i:number) =>{
    isEditable && fillRating(i);  
  };

  const changeRating = (i:number) => {
    isEditable && setRating && setRating(i); 
  };
  const handleSpace = (i:number, e:KeyboardEvent<SVGElement>) => {
    if(!isEditable || !setRating || e.code !== "Space"){
      return ;
    }
    setRating(i);
  }; 
  return (
    <div className={cn(className, styles.ratingWrapper,{[styles.error]:error})} {...props} ref={ref}>
      {ratingArray.map((r,i)=>  <span key={i}>{r}</span> )}
      {error && <span className={styles.errorMsg}>{error.message}</span>}
    </div>
  );
});