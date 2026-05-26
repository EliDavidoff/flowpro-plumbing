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

function fadeOpacity(progress: number, start = 0, end = 0.75) {
  if (progress <= start) return 1;
  if (progress >= end) return 0;
  return 1 - (progress - start) / (end - start);
}

export default function Hero() {
  const scrollRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollProgress(v);
  });

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

  const contentOpacity = reducedMotion ? 1 : fadeOpacity(scrollProgress, 0.05, 0.7);
  const canvasOpacity = reducedMotion ? 1 : fadeOpacity(scrollProgress, 0, 0.55);
  const overlayOpacity = reducedMotion ? 0 : Math.min(0.92, scrollProgress * 1.15);
  const vignetteOpacity = reducedMotion ? 1 : 0.6 + scrollProgress * 0.4;

  return (
    <section
      ref={scrollRef}
      className={
        isMobile ? `${styles.scrollSpace} ${styles.scrollSpaceMobile}` : styles.scrollSpace
      }
      aria-label="Hero"
      style={{ ["--hero-scroll" as string]: scrollProgress }}
    >
      <HeroScrollContext.Provider value={scrollProgress}>
        <motion.div
          className={styles.sticky}
          style={{ y: heroY, scale: heroScale }}
        >
          <motion.div className={styles.canvasWrap} style={{ x: canvasX }}>
            <div className={styles.canvasFade} style={{ opacity: canvasOpacity }}>
              <HeroCanvas reducedMotion={reducedMotion} />
            </div>
          </motion.div>
          <div className={styles.contentSlot} style={{ opacity: contentOpacity }}>
            <HeroContent />
          </div>
          <div
            className={styles.scrollOverlay}
            style={{ opacity: overlayOpacity }}
            aria-hidden
          />
          <div
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
