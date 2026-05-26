import MobileNav from "./MobileNav";
import styles from "./HeroContent.module.css";

export default function HeroContent() {
  return (
    <div className={styles.content}>
      <header className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden>
            ◆
          </span>
          FlowPro
        </div>
        <nav className={styles.links} aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact" className={styles.navCta}>
            Get a quote
          </a>
        </nav>
        <MobileNav />
      </header>

      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span className={styles.badge}>Licensed & insured</span>
          <span className={styles.eyebrowText}>24/7 emergency response</span>
        </p>
        <h1 className={styles.headline}>
          Expert plumbing,
          <br />
          <span className={styles.accent}>flowing smoothly.</span>
        </h1>
        <p className={styles.sub}>
          From burst pipes to full bathroom remodels — trusted local pros with
          same-day service across the metro area.
        </p>
        <div className={styles.actions}>
          <a href="tel:+15551234567" className={styles.primaryBtn}>
            Call (555) 123-4567
          </a>
          <a href="#services" className={styles.secondaryBtn}>
            View services
          </a>
        </div>
        <ul className={styles.stats} aria-label="Highlights">
          <li>
            <strong>15+</strong>
            <span>Years experience</span>
          </li>
          <li>
            <strong>4.9</strong>
            <span>Average rating</span>
          </li>
          <li>
            <strong>2hr</strong>
            <span>Avg. response time</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
