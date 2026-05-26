import { businessPhotos } from "../data/business";
import styles from "./PhotoGallery.module.css";

export default function PhotoGallery() {
  return (
    <div className={styles.gallery} aria-label="Photos from Google Business Profile">
      {businessPhotos.map((photo) => (
        <figure key={photo.src} className={styles.figure}>
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}
