import { FiArrowDown, FiCalendar, FiHeart, FiMapPin, FiUsers } from "react-icons/fi";
import styles from "./styles.module.css";

const BoardIntro = ({ openCount, causeCount, plannedCount }) => (
    <section className={styles.boardIntro} aria-labelledby="intro-title">
        <div className={styles.locationLine}>
            <span>
                <FiMapPin aria-hidden="true" />
                Northbank community board
            </span>
            <span className={styles.openLabel}>
                <i aria-hidden="true" />
                New shifts added weekly
            </span>
        </div>

        <div className={styles.introContent}>
            <div className={styles.copy}>
                <h1 id="intro-title">
                    Give a little time.
                    <span>Change a lot.</span>
                </h1>
                <p className={styles.description}>
                    Find a nearby shift that feels right for you. A free morning,
                    a kind hello, or a pair of helping hands can make a real
                    difference.
                </p>
                <a className={styles.exploreLink} href="#opportunities">
                    Explore open shifts
                    <FiArrowDown aria-hidden="true" />
                </a>
            </div>

            <aside className={styles.weekCard} aria-label="Northbank volunteer needs">
                <div className={styles.weekHeading}>
                    <span>Coming up in Northbank</span>
                    <FiHeart aria-hidden="true" />
                </div>
                <p className={styles.shiftCount}>
                    {openCount.toString().padStart(2, "0")}
                    <span>open shifts</span>
                </p>
                <div className={styles.weekStats}>
                    <div>
                        <span className={styles.statIcon} aria-hidden="true">
                            <FiUsers />
                        </span>
                        <p>
                            <strong>{causeCount}</strong>
                            <span>local causes</span>
                        </p>
                    </div>
                    <div>
                        <span className={styles.statIcon} aria-hidden="true">
                            <FiCalendar />
                        </span>
                        <p>
                            <strong>{plannedCount}</strong>
                            <span>in your plans</span>
                        </p>
                    </div>
                </div>
                <p className={styles.weekNote}>There is room for you.</p>
            </aside>
        </div>

        <div className={styles.valueLine}>
            <span>Most shifts take 1-3 hours.</span>
            <span>Choose a shift and find it later in My shifts.</span>
        </div>
    </section>
);

export default BoardIntro;
