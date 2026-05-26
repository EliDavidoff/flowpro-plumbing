import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./ScrollHint.module.css";

export default function ScrollHint() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className={styles.hint}
      style={{ opacity }}
      aria-hidden
    >
      <span className={styles.text}>Scroll</span>
      <span className={styles.line} />
    </motion.div>
  );
}
