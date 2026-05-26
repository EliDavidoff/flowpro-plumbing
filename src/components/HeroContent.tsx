import { businessProfile, formatPhoneDisplay } from "../data/business";
import MobileNav from "./MobileNav";
import styles from "./HeroContent.module.css";

const phoneDisplay = formatPhoneDisplay(businessProfile.phone);

export default function HeroContent() {
  return (
    <div className={styles.shell}>
      <header className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden>
            ◆
          </span>
          {businessProfile.shortName}
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
          <span className={styles.badge}>Licensed plumber</span>
          <span className={styles.eyebrowText}>{businessProfile.serviceArea}</span>
        </p>
        <h1 className={styles.headline}>
          Dallas plumbing,
          <br />
          <span className={styles.accent}>done right the first time.</span>
        </h1>
        <p className={styles.sub}>
          From clogged drains and leaking faucets to shower valves and repipes —
          {businessProfile.shortName} serves homeowners across Dallas with clear
          pricing and reliable workmanship.
        </p>
        <div className={styles.actions}>
          <a href={`tel:${businessProfile.phone}`} className={styles.primaryBtn}>
            Call {phoneDisplay}
          </a>
          <a href="#services" className={styles.secondaryBtn}>
            View services
          </a>
        </div>
        <ul className={styles.stats} aria-label="Highlights">
          <li>
            <strong>{businessProfile.rating}</strong>
            <span>Google rating</span>
          </li>
          <li>
            <strong>{businessProfile.reviewCount}</strong>
            <span>Google reviews</span>
          </li>
          <li>
            <strong>8–5</strong>
            <span>Mon–Sat hours</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
