import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import styles from "./Sections.module.css";

const services = [
  {
    title: "Emergency repairs",
    desc: "Burst pipes, backups, and leaks — rapid dispatch day or night.",
    icon: "🚨",
  },
  {
    title: "Drain cleaning",
    desc: "Hydro-jetting and camera inspections for stubborn clogs.",
    icon: "🚿",
  },
  {
    title: "Water heaters",
    desc: "Tank, tankless install, repair, and flush services.",
    icon: "♨️",
  },
  {
    title: "Remodels",
    desc: "Bathrooms, kitchens, and repiping with clean workmanship.",
    icon: "🏠",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Services() {
  const gridRef = useRef<HTMLUListElement>(null);
  const gridInView = useInView(gridRef, { once: false, amount: 0.2 });

  return (
    <ScrollReveal id="services" className={styles.section} parallax={40}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Services</p>
        <h2 className={styles.heading}>What we fix & install</h2>
        <motion.ul
          ref={gridRef}
          className={styles.grid}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              className={styles.card}
              custom={i}
              variants={cardVariants}
            >
              <span className={styles.cardIcon} aria-hidden>
                {s.icon}
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </ScrollReveal>
  );
}
