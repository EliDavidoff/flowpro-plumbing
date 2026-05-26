import ScrollReveal from "./ScrollReveal";
import styles from "./Sections.module.css";

export default function About() {
  return (
    <ScrollReveal id="about" className={styles.sectionAlt} parallax={44}>
      <div className={styles.inner}>
        <p className={styles.kicker}>About</p>
        <h2 className={styles.heading}>Neighbors trust FlowPro</h2>
        <p className={styles.prose}>
          We’re a family-owned plumbing team serving homes and small businesses
          across the metro. Every technician is licensed, background-checked, and
          trained to leave your space cleaner than we found it.
        </p>
        <p className={styles.prose}>
          Upfront pricing, photo updates during bigger jobs, and a two-year
          warranty on most installations — because good plumbing should last.
        </p>
      </div>
    </ScrollReveal>
  );
}
