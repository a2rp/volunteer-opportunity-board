import { useEffect, useRef } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const CancelSignupModal = ({ signup, onClose, onConfirm }) => {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        cancelRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) {
                return;
            }

            const focusable = dialogRef.current.querySelectorAll(
                "button:not([disabled])",
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

    const closeFromBackdrop = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onMouseDown={closeFromBackdrop}>
            <section
                className={styles.dialog}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="cancel-signup-title"
                aria-describedby="cancel-signup-description"
                ref={dialogRef}
            >
                <div className={styles.icon} aria-hidden="true">
                    <FiAlertCircle />
                </div>
                <button
                    className={styles.closeButton}
                    type="button"
                    aria-label="Close confirmation"
                    onClick={onClose}
                >
                    <FiX aria-hidden="true" />
                </button>
                <h2 id="cancel-signup-title">Remove your sign-up?</h2>
                <p className={styles.itemName}>{signup.title}</p>
                <p id="cancel-signup-description">
                    This will give your place back to the organizer. You can
                    sign up again if places remain.
                </p>
                <div className={styles.actions}>
                    <button
                        className={styles.keepButton}
                        type="button"
                        onClick={onClose}
                        ref={cancelRef}
                    >
                        Keep my spot
                    </button>
                    <button
                        className={styles.removeButton}
                        type="button"
                        onClick={() => onConfirm(signup.id)}
                    >
                        Remove sign-up
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CancelSignupModal;
