import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroScrollContext } from "../context/HeroScrollContext";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import HeroCanvas from "./HeroCanvas";
import HeroContent from "./HeroContent";
import ScrollHint from "./ScrollHint";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", setScrollProgress);

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.95],
    reducedMotion ? [1, 1, 1] : [1, 0.5, 0]
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, isMobile ? -72 : -140]
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1, isMobile ? 0.96 : 0.9]
  );
  const canvasX = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, isMobile ? 24 : 90]
  );
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.6]);

  return (
    <section
      ref={scrollRef}
      className={isMobile ? `${styles.scrollSpace} ${styles.scrollSpaceMobile}` : styles.scrollSpace}
      aria-label="Hero"
    >
      <HeroScrollContext.Provider value={scrollProgress}>
        <motion.div
          className={styles.sticky}
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        >
          <div className={styles.contentSlot}>
            <HeroContent />
          </div>
          <motion.div className={styles.canvasWrap} style={{ x: canvasX }}>
            <HeroCanvas />
          </motion.div>
          <motion.div
            className={styles.vignette}
            style={{ opacity: vignetteOpacity }}
            aria-hidden
          />
          {!reducedMotion && <ScrollHint />}
        </motion.div>
      </HeroScrollContext.Provider>
    </section>
  );
}
