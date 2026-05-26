import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionProps,
} from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  parallax?: number;
  id?: string;
} & Pick<MotionProps, "style">;

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  parallax = 48,
  id,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const travel = reducedMotion ? 0 : isMobile ? Math.min(parallax, 24) : parallax;

  const inView = useInView(ref, {
    once: false,
    amount: isMobile ? 0.15 : 0.25,
    margin: isMobile ? "-4% 0px" : "-8% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    reducedMotion ? [0, 0, 0, 0] : [travel, 0, 0, -travel * 0.5]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.75, 1],
    reducedMotion ? [1, 1, 1, 1, 1] : [0.15, 0.55, 1, 1, 0.35]
  );

  const snapClass = reducedMotion ? "" : "snap-section";

  return (
    <motion.section
      ref={ref}
      id={id}
      className={[className, snapClass].filter(Boolean).join(" ")}
      style={reducedMotion ? style : { y, opacity, ...style }}
      initial={reducedMotion ? false : { opacity: 0, y: travel * 0.6 }}
      animate={
        reducedMotion
          ? undefined
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0.25, y: travel * 0.35 }
      }
      transition={{
        duration: reducedMotion ? 0 : isMobile ? 0.45 : 0.65,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.section>
  );
}
