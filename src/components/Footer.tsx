import { businessProfile } from "../data/business";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>
        © {year} {businessProfile.name}. Licensed & insured.
      </p>
      <a href={`tel:${businessProfile.phone}`}>Call us</a>
    </footer>
  );
}
