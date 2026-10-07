import {
    FiArrowUpRight,
    FiBookOpen,
    FiCalendar,
    FiClock,
    FiHeart,
    FiSun,
    FiMapPin,
    FiShoppingBag,
    FiUsers,
} from "react-icons/fi";
import styles from "./styles.module.css";

const causeIcons = {
    Animals: FiHeart,
    Community: FiUsers,
    Environment: FiSun,
    "Food support": FiShoppingBag,
    Learning: FiBookOpen,
};

const formatDate = (dateString) =>
    new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};

const OpportunityCard = ({
    opportunity,
    isSaved,
    isSignedUp,
    onToggleSaved,
    onSignUp,
}) => {
    const CauseIcon = causeIcons[opportunity.cause] || FiHeart;
    const spotsLeft =
        opportunity.capacity - opportunity.filled - Number(isSignedUp);
    const accentStyle = styles[opportunity.accent] || styles.coral;
    const imageSource = opportunity.image
        ? `${import.meta.env.BASE_URL}images/${opportunity.image}`
        : "";

    return (
        <article className={`${styles.opportunityCard} ${accentStyle}`}>
            <div className={styles.cardImage}>
                {imageSource ? (
                    <img src={imageSource} alt={opportunity.imageAlt} />
                ) : (
                    <div className={styles.cardArt} aria-hidden="true">
                        <span className={styles.artCircle} />
                        <CauseIcon />
                    </div>
                )}
                <span className={styles.causeTag}>
                    <CauseIcon aria-hidden="true" />
                    {opportunity.cause}
                </span>
                <button
                    className={isSaved ? styles.savedButton : styles.saveButton}
                    type="button"
                    aria-label={
                        isSaved
                            ? `Remove ${opportunity.title} from saved shifts`
                            : `Save ${opportunity.title}`
                    }
                    aria-pressed={isSaved}
                    onClick={() => onToggleSaved(opportunity.id)}
                >
                    <FiHeart aria-hidden="true" />
                </button>
            </div>

            <div className={styles.cardContent}>
                <p className={styles.organization}>{opportunity.organization}</p>
                <h3>{opportunity.title}</h3>
                <p className={styles.summary}>{opportunity.summary}</p>

                <div className={styles.shiftDetails}>
                    <span>
                        <FiCalendar aria-hidden="true" />
                        {formatDate(opportunity.date)}
                    </span>
                    <span>
                        <FiClock aria-hidden="true" />
                        {formatTime(opportunity.startTime)}
                    </span>
                    <span>
                        <FiMapPin aria-hidden="true" />
                        {opportunity.location}
                    </span>
                </div>

                <div className={styles.cardFooter}>
                    <span
                        className={
                            spotsLeft <= 3 ? styles.lowSpots : styles.spots
                        }
                    >
                        {spotsLeft === 0
                            ? "Full"
                            : `${spotsLeft} ${spotsLeft === 1 ? "place" : "places"} left`}
                    </span>
                    <button
                        className={isSignedUp ? styles.signedButton : styles.joinButton}
                        type="button"
                        disabled={isSignedUp || spotsLeft === 0}
                        onClick={() => onSignUp(opportunity)}
                    >
                        {isSignedUp ? "In your plan" : "Sign up"}
                        {!isSignedUp ? <FiArrowUpRight aria-hidden="true" /> : null}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default OpportunityCard;
