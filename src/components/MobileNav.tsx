import { useEffect, useId, useState } from "react";
import { businessProfile } from "../data/business";
import styles from "./MobileNav.module.css";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={styles.wrap}>
      <a href={`tel:${businessProfile.phone}`} className={styles.callBtn}>
        Call
      </a>
      <button
        type="button"
        className={styles.menuBtn}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.menuIcon} aria-hidden />
        <span className={styles.srOnly}>{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={close}
        />
      )}

      <nav
        id={panelId}
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={styles.panelCta} onClick={close}>
          Get a quote
        </a>
      </nav>
    </div>
  );
}
