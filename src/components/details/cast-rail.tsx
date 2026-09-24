import Image from "next/image";
import { UserRound } from "lucide-react";
import { profileUrl, type CastMember } from "@/lib/tmdb";
import styles from "./movie-detail.module.css";

type Props = {
  cast: CastMember[];
};

export function CastRail({ cast }: Props) {
  return (
    <section className={styles.castSection} aria-labelledby="cast-title">
      <div className={styles.sectionHeading}>
        <span className={styles.sectionIndex}>02 / On screen</span>
        <h2 id="cast-title" className={styles.sectionTitle}>The cast</h2>
      </div>
      <div className={styles.castRail}>
        {cast.map((member) => {
          const photo = profileUrl(member.profile_path, "w185");
          return (
            <div className={styles.castMember} key={`${member.id}-${member.order}`}>
              <div className={styles.castPhoto}>
                {photo ? (
                  <Image
                    src={photo}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 112px, 150px"
                    className={styles.castImage}
                  />
                ) : (
                  <div className={styles.castFallback} role="img" aria-label={`No photo available for ${member.name}`}>
                    <UserRound size={31} strokeWidth={1.2} aria-hidden="true" />
                  </div>
                )}
              </div>
              <h3 className={styles.castName}>{member.name}</h3>
              <p className={styles.characterName}>{member.character || "Cast"}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
