import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { businessProfile, businessReviews } from "../data/business";
import ScrollReveal from "./ScrollReveal";
import styles from "./Sections.module.css";

export default function Reviews() {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: false, amount: 0.25 });

  return (
    <ScrollReveal id="reviews" className={styles.section} parallax={40}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Reviews</p>
        <h2 className={styles.heading}>
          {businessProfile.rating} stars on Google ({businessProfile.reviewCount}{" "}
          reviews)
        </h2>
        <motion.div
          ref={listRef}
          className={styles.reviewList}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {businessReviews.map((r) => (
            <motion.blockquote
              key={r.name}
              className={styles.reviewCard}
              variants={{
                hidden: { opacity: 0, x: -32 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
                },
              }}
            >
              <p className={styles.reviewStars} aria-hidden>
                {"★".repeat(r.stars)}
              </p>
              <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
              <footer>— {r.name}</footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </ScrollReveal>
  );
}
