import { businessProfile } from "../data/business";
import styles from "./MobileNav.module.css";

export default function MobileNav() {
  return (
    <a href={`tel:${businessProfile.phone}`} className={styles.callBtn}>
      Call
    </a>
  );
}
