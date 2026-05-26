import { businessProfile } from "../data/business";
import ScrollReveal from "./ScrollReveal";
import styles from "./GoogleBusinessCard.module.css";

function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < full ? styles.starFull : half && i === full ? styles.starHalf : styles.starEmpty
          }
          aria-hidden
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function GoogleBusinessCard() {
  const b = businessProfile;
  const phoneDisplay = b.phone.replace(/^\+1/, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  return (
    <ScrollReveal id="contact" className={styles.section} parallax={56}>
      <div className={styles.wrap}>
        <p className={styles.kicker}>Find us on Google</p>
        <h2 className={styles.title}>Your local plumbing team</h2>

        <article className={styles.card} aria-label={`${b.name} on Google`}>
          <div className={styles.cover}>
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="" className={styles.coverImg} />
            ) : (
              <div className={styles.coverPlaceholder} aria-hidden />
            )}
            <span className={styles.googleBadge}>
              <span className={styles.googleG}>G</span> Business
            </span>
          </div>

          <div className={styles.body}>
            <header className={styles.header}>
              <h3 className={styles.name}>{b.name}</h3>
              <p className={styles.category}>{b.category}</p>
              <div className={styles.ratingRow}>
                <StarRow rating={b.rating} />
                <span className={styles.ratingNum}>{b.rating}</span>
                <span className={styles.reviews}>({b.reviewCount} reviews)</span>
              </div>
            </header>

            <ul className={styles.meta}>
              <li>
                <span className={styles.metaIcon} aria-hidden>📍</span>
                <span>
                  {b.address}
                  <br />
                  {b.city}
                </span>
              </li>
              <li>
                <span className={styles.metaIcon} aria-hidden>🕐</span>
                <span>
                  <strong className={styles.open}>{b.status}</strong> · {b.hours}
                </span>
              </li>
              <li>
                <span className={styles.metaIcon} aria-hidden>📞</span>
                <a href={`tel:${b.phone}`}>{phoneDisplay}</a>
              </li>
            </ul>

            <div className={styles.actions}>
              <a href={`tel:${b.phone}`} className={styles.actionPrimary}>
                Call
              </a>
              <a
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionSecondary}
              >
                Directions
              </a>
              <a
                href={b.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionSecondary}
              >
                Website
              </a>
            </div>
          </div>
        </article>

        <p className={styles.hint}>
          Send your Google Business card screenshot — we’ll match name, photo, hours, and reviews
          exactly.
        </p>
      </div>
    </ScrollReveal>
  );
}
