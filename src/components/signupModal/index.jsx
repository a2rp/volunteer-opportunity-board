import { useEffect, useRef } from "react";
import { FiCalendar, FiClock, FiMapPin, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const formatDate = (dateString) =>
    new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
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

const SignupModal = ({ opportunity, onClose, onSubmit }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        const dialog = dialogRef.current;
        const firstField = dialog?.querySelector("input");
        firstField?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialog) {
                return;
            }

            const focusable = dialog.querySelectorAll(
                "button:not([disabled]), input:not([disabled]), textarea:not([disabled])",
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onClose]);

    const submitSignup = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        onSubmit({
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            note: formData.get("note").trim(),
        });
    };

    const closeFromBackdrop = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onMouseDown={closeFromBackdrop}>
            <section
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="signup-title"
                aria-describedby="signup-description"
                ref={dialogRef}
            >
                <div className={styles.shiftSummary}>
                    <div className={styles.summaryTop}>
                        <span className={styles.label}>Join the shift</span>
                        <button
                            className={styles.closeButton}
                            type="button"
                            aria-label="Close sign-up form"
                            onClick={onClose}
                        >
                            <FiX aria-hidden="true" />
                        </button>
                    </div>
                    <h2 id="signup-title">{opportunity.title}</h2>
                    <p className={styles.organization}>
                        {opportunity.organization}
                    </p>
                    <div className={styles.details}>
                        <span>
                            <FiCalendar aria-hidden="true" />
                            {formatDate(opportunity.date)}
                        </span>
                        <span>
                            <FiClock aria-hidden="true" />
                            {formatTime(opportunity.startTime)} ·{" "}
                            {opportunity.durationHours} hour
                            {opportunity.durationHours === 1 ? "" : "s"}
                        </span>
                        <span>
                            <FiMapPin aria-hidden="true" />
                            {opportunity.address}
                        </span>
                    </div>
                    <p
                        className={styles.shiftDescription}
                        id="signup-description"
                    >
                        {opportunity.details}
                    </p>
                    <p className={styles.localNote}>
                        This demo saves your plan on this device. It does not
                        send your details to the organization.
                    </p>
                </div>

                <form className={styles.form} onSubmit={submitSignup}>
                    <div className={styles.formHeading}>
                        <span>Volunteer details</span>
                        <p>Add your details to your volunteer plan.</p>
                    </div>

                    <label className={styles.field}>
                        <span>Full name</span>
                        <input
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your name"
                            maxLength={70}
                            required
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Email address</span>
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            maxLength={120}
                            required
                        />
                    </label>
                    <label className={styles.field}>
                        <span>
                            Note for your plan <small>Optional</small>
                        </span>
                        <textarea
                            name="note"
                            rows="3"
                            maxLength={240}
                            placeholder="Share anything they should know"
                        />
                    </label>

                    <div className={styles.formActions}>
                        <button
                            className={styles.cancelButton}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className={styles.submitButton} type="submit">
                            Add to My shifts
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SignupModal;
