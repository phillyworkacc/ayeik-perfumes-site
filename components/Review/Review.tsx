'use client'
import { Review } from "@/types";
import Spacing from "../Spacing/Spacing";
import styles from "./Review.module.css";

type ReviewProps = {
   review: Review;
}

export default function ReviewCard ({ review }: ReviewProps) {
   return (
      <div className={styles.reviewCard}>
         <div className="text-xs full line-height-15 text-left">{review.review}</div>
         <Spacing />
         <div className={styles.reviewFooter}>
            <div className={styles.reviewAvatar}>{review.name?.charAt(0).toUpperCase()}</div>
            <div className="box full dfb column align-start">
               <div className="text-xxs full bold-600 text-left">{review.name}</div>
               <div className="text-xxxs full grey-5 text-left">Customer</div>
            </div>
         </div>
      </div>
   )
}
