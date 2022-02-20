import { UserReviewProps } from "./Review.props";
import styles from "./Review.module.scss";
import cn from "classnames";
import UserIcon from "./user.svg";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { P, Rating } from "../..";

export const UserReview = ({review,className,...props}:UserReviewProps):JSX.Element => {
  const {name,rating, title,createdAt,description} = review;
  return (
    <div className={cn(styles.userReview,className)} {...props}>
          <UserIcon />
          <div className={styles.reviewTitle}>
            <b>{name}:</b>
            {title}
          </div>
          <div className={styles.reviewRating}>
            {format(new Date(createdAt),"dd MMMM yyyy",{locale:ru})}
            <Rating rating={rating} />
          </div>
          <P className={styles.reviewDescription} size="sm">{description}</P>
        </div>
  );
};