import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styles from "./styles.module.css";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => {
            setVisible(window.scrollY > 50);
        };

        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });

        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);

    const returnToTop = () => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    if (!visible) {
        return null;
    }

    return (
        <button
            className={styles.backToTop}
            type="button"
            aria-label="Back to top"
            onClick={returnToTop}
        >
            <FiArrowUp aria-hidden="true" />
            <span>Back to top</span>
        </button>
    );
};

export default BackToTop;
