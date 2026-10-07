import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const navigationLinks = [
    { label: "Find a shift", href: "#opportunities" },
    { label: "My shifts", href: "#my-shifts" },
    { label: "How it works", href: "#how-it-works" },
];

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeOnOutsideClick = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    return (
        <header className={styles.siteHeader} ref={headerRef}>
            <div className={styles.inner}>
                <a className={styles.brand} href="#top" aria-label="Goodturn home">
                    <span className={styles.brandMark} aria-hidden="true">
                        <FiHeart />
                    </span>
                    <span className={styles.brandText}>
                        goodturn<span>.</span>
                        <small>Northbank</small>
                    </span>
                </a>

                <nav
                    className={menuOpen ? styles.navigationOpen : styles.navigation}
                    id="main-navigation"
                    aria-label="Main navigation"
                >
                    {navigationLinks.map((link) => (
                        <a
                            className={styles.navLink}
                            href={link.href}
                            key={link.href}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <a
                        className={styles.repoLink}
                        href="https://github.com/a2rp/volunteer-opportunity-board"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="main-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            <FiX aria-hidden="true" />
                        ) : (
                            <FiMenu aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;
