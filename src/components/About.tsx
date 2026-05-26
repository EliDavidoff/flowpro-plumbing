import { businessProfile } from "../data/business";
import PhotoGallery from "./PhotoGallery";
import ScrollReveal from "./ScrollReveal";
import styles from "./Sections.module.css";

export default function About() {
  return (
    <ScrollReveal id="about" className={styles.sectionAlt} parallax={44}>
      <div className={styles.inner}>
        <p className={styles.kicker}>About</p>
        <h2 className={styles.heading}>Trusted plumbing in Dallas</h2>
        <p className={styles.prose}>
          {businessProfile.name} is your local plumber at{" "}
          {businessProfile.address}, serving {businessProfile.serviceArea} with
          residential repairs, drain work, and fixture installs. Customers on
          Google praise our punctual arrivals, clear explanations, and careful
          work — whether it&apos;s a single faucet or multiple issues in one
          visit.
        </p>
        <p className={styles.prose}>
          Call {businessProfile.shortName} for honest assessments, quality
          parts, and repairs done without unnecessary damage to your home —
          like fixing shower valves without tearing out tile.
        </p>
        <PhotoGallery />
      </div>
    </ScrollReveal>
  );
}
