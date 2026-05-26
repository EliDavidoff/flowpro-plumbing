import { useCallback, useEffect, useState } from "react";
import { siteSections } from "../data/sections";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import styles from "./SectionNav.module.css";

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

export default function SectionNav() {
  const [activeId, setActiveId] = useState(siteSections[0].id);
  const [isPastHero, setIsPastHero] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const onHeroVisibility = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsPastHero(!entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    onHeroVisibility.observe(hero);
    return () => onHeroVisibility.disconnect();
  }, []);

  useEffect(() => {
    const elements = siteSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      setActiveId(id);
    },
    [reducedMotion]
  );

  const activeIndex = siteSections.findIndex((s) => s.id === activeId);
  const indexDisplay = activeIndex >= 0 ? activeIndex : 0;

  return (
    <nav
      className={isPastHero ? `${styles.nav} ${styles.navVisible}` : styles.nav}
      aria-label="Page sections"
      aria-hidden={!isPastHero}
    >
      <p className={styles.counter} aria-live="polite">
        <span className={styles.counterCurrent}>{padIndex(indexDisplay + 1)}</span>
        <span className={styles.counterSep}>/</span>
        <span className={styles.counterTotal}>{padIndex(siteSections.length)}</span>
      </p>

      <ol className={styles.list}>
        {siteSections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                className={isActive ? `${styles.item} ${styles.itemActive}` : styles.item}
                onClick={() => scrollTo(section.id)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.dot} aria-hidden />
                <span className={styles.label}>{section.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
