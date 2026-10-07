import { useState } from "react";
import { FiCalendar, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import CancelSignupModal from "./cancelSignupModal/index.jsx";
import styles from "./styles.module.css";

const formatDate = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);

    return {
        day: date.toLocaleDateString("en-US", { day: "numeric" }),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
};

const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};

const MyShifts = ({ signups, onCancelSignup }) => {
    const [cancelingSignup, setCancelingSignup] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const sortedSignups = [...signups].sort(
        (first, second) => new Date(first.date) - new Date(second.date),
    );
    const hoursPlanned = signups.reduce(
        (total, signup) => total + Number(signup.durationHours || 0),
        0,
    );

    const removeSignup = (signupId) => {
        onCancelSignup(signupId);
        setCancelingSignup(null);
        setStatusMessage("Sign-up removed from your plan.");
    };

    return (
        <section
            className={styles.myShifts}
            id="my-shifts"
            aria-labelledby="my-shifts-title"
        >
            <div className={styles.heading}>
                <div>
                    <p className={styles.sectionLabel}>Your volunteer plan</p>
                    <h2 id="my-shifts-title">Good dates to keep.</h2>
                    <p className={styles.description}>
                        Sign up for a shift and it will be saved here on this
                        device.
                    </p>
                </div>
                <div className={styles.hoursPlanned}>
                    <FiClock aria-hidden="true" />
                    <strong>{hoursPlanned}</strong>
                    <span>{hoursPlanned === 1 ? "hour" : "hours"} planned</span>
                </div>
            </div>

            {sortedSignups.length ? (
                <div className={styles.signupList}>
                    {sortedSignups.map((signup) => {
                        const date = formatDate(signup.date);

                        return (
                            <article
                                className={styles.signupCard}
                                key={signup.id}
                            >
                                <time
                                    className={styles.dateTile}
                                    dateTime={signup.date}
                                    aria-label={
                                        date.weekday +
                                        " " +
                                        date.month +
                                        " " +
                                        date.day
                                    }
                                >
                                    <span>{date.weekday}</span>
                                    <strong>{date.day}</strong>
                                    <span>{date.month}</span>
                                </time>
                                <div className={styles.signupInfo}>
                                    <span className={styles.cause}>
                                        {signup.cause}
                                    </span>
                                    <h3>{signup.title}</h3>
                                    <p className={styles.organization}>
                                        {signup.organization}
                                    </p>
                                    <div className={styles.details}>
                                        <span>
                                            <FiClock aria-hidden="true" />
                                            {formatTime(
                                                signup.startTime,
                                            )} for {signup.durationHours} hour
                                            {signup.durationHours === 1
                                                ? ""
                                                : "s"}
                                        </span>
                                        <span>
                                            <FiMapPin aria-hidden="true" />
                                            {signup.location}
                                        </span>
                                        <span>
                                            <FiUsers aria-hidden="true" />
                                            {signup.volunteerName}
                                        </span>
                                    </div>
                                    {signup.note ? (
                                        <p className={styles.volunteerNote}>
                                            Note: {signup.note}
                                        </p>
                                    ) : null}
                                </div>
                                <div className={styles.signupActions}>
                                    <span className={styles.status}>
                                        <i aria-hidden="true" />
                                        Plan saved
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCancelingSignup(signup)
                                        }
                                    >
                                        Cancel sign-up
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <span className={styles.emptyIcon} aria-hidden="true">
                        <FiCalendar />
                    </span>
                    <div>
                        <h3>Your next good thing goes here.</h3>
                        <p>
                            Sign up for a local shift to start your volunteer
                            plan.
                        </p>
                    </div>
                    <a href="#opportunities">Find a shift</a>
                </div>
            )}

            <p
                className={styles.statusMessage}
                role="status"
                aria-live="polite"
            >
                {statusMessage}
            </p>

            {cancelingSignup ? (
                <CancelSignupModal
                    signup={cancelingSignup}
                    onClose={() => setCancelingSignup(null)}
                    onConfirm={removeSignup}
                />
            ) : null}
        </section>
    );
};

export default MyShifts;
