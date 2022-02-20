import { ProductProps } from "./Product.props";
import styles from "./Product.module.scss";
import cn from "classnames";
import { Button, Form, Htag, P, Rating, Tag,UserReview } from "..";
import { declination, priceRegex } from "../../helpers/helpers";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";


export const Product = motion(forwardRef(({product, className,...props}:ProductProps,ref:ForwardedRef<HTMLDivElement>):JSX.Element => {
  const [isOpened,setIsOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);
  const scrollToReview =() => {
    setIsOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior:"smooth",
      block:"center"
    }); 
  };
  const variants = {
    hidden:{
      height:0,
      opacity:1
    },
    visible:{
      height:"auto",
      opacity:1
    }
  };
  return (
    <>
      <div className={cn(styles.productCard,className)} {...props} ref={ref}>
        <div className={styles.productHeader}>
          <div className={styles.productHead}>
            <div className={styles.img}>
            <Image 
              src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
              alt={product.title}
              width={70}
              height={70}
              layout="fixed"
            />
            </div>          
            <div className={styles.productTitle}>
              <Htag tag="h3">{product.title}</Htag>
              {product.categories.map(c => (<Tag key={c} size="sm" color="ghost">{c}</Tag>))}
            </div>
          </div>
          <div className={styles.productPrices}>
            <div className={styles.productPrice}>
              {priceRegex(product.price,true)}
              <Tag color="green" size="sm">
                {priceRegex(product.price-product.oldPrice,true)}
              </Tag>
              <p>цена</p>
            </div>
            <div className={styles.productCredit}>
              {priceRegex(product.credit,true)}/мес
              <p>в кредит</p>
            </div>
            <div className={styles.productRating}>
              <Rating rating={5} />
              <p><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declination(product.reviewCount)}</a></p>
            </div>
          </div>
        </div>
        <div className={styles.productInfo}>
          <P className={styles.productDescription} size="md">{product.description}</P>
          <div className={styles.productCharacteristics}>
            {product.characteristics.map((c,i) => (<div key={i} className={styles.productCharacteristic}>
              <b>{c.name}</b>
              <div className={styles.border}></div>
              {c.value}
            </div>))}
            <div  className={styles.productTags}>
              {product.tags.map(t => (<Tag key={t} size="sm" color="ghost">{t}</Tag>))}
            </div>
          </div>
          {product.advantages && <div className={styles.productAdvantages}>
              <div className={styles.advantageWrapper}>
                <P size="md"><b>Преимущества</b></P>
                <P size="sm">
                  {product.advantages}
                </P>

              </div>
            </div>}
        </div>
        {product.html && <div className={styles.productSeo} dangerouslySetInnerHTML={{__html:product.html}} />}
        <div className={styles.productFooter}>
          <a href={product.link} target="_blank"><Button appearance="primary" arrow="none">Узнать подробнее</Button></a>
          <Button onClick={() => setIsOpened(!isOpened)} appearance="ghost" arrow={isOpened ? "down" : "right"}>Читать отзывы{product.reviewCount > 0 ? ` (${product.reviewCount})`: ""}</Button>
        </div>
      </div>
      <motion.div transition={{type:"tween", duration:1}} variants={variants} initial={"hidden"} ref={reviewRef} animate={isOpened ? "visible" : "hidden"} className={cn(styles.ReviewBlock)}>
        <div className={styles.reviewWrapper}>
          {product.reviews.length > 0 && <div className={styles.userReviews}>{product.reviews.map(r => <UserReview review={r} key={r._id} />)}</div>}
          <Form  className={styles.formReview} productId={product._id} />
        </div>  
      </motion.div>
    </>
  );
}));