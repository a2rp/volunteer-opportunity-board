import { useState } from "react";
import BoardIntro from "./components/boardIntro/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import HowItWorks from "./components/howItWorks/index.jsx";
import MyShifts from "./components/myShifts/index.jsx";
import OpportunityBoard from "./components/opportunityBoard/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { volunteerOpportunities } from "./data/volunteerOpportunities.js";
import styles from "./App.module.css";

const storageKeys = {
    saved: "goodturn-saved-shifts",
    signups: "goodturn-signups",
};

const opportunityIds = new Set(
    volunteerOpportunities.map((opportunity) => opportunity.id),
);

const readList = (key) => {
    try {
        const storedValue = localStorage.getItem(key);
        const parsedValue = storedValue ? JSON.parse(storedValue) : [];

        return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
        return [];
    }
};

const readSavedIds = () =>
    [...new Set(readList(storageKeys.saved))].filter(
        (id) => typeof id === "string" && opportunityIds.has(id),
    );

const isNonEmptyText = (value, maxLength) =>
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength;

const isValidDate = (value) => {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day, 12);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

const isValidSignup = (signup) =>
    signup !== null &&
    typeof signup === "object" &&
    !Array.isArray(signup) &&
    isNonEmptyText(signup.id, 200) &&
    typeof signup.opportunityId === "string" &&
    opportunityIds.has(signup.opportunityId) &&
    isNonEmptyText(signup.title, 120) &&
    isNonEmptyText(signup.organization, 120) &&
    isNonEmptyText(signup.cause, 80) &&
    isNonEmptyText(signup.location, 120) &&
    isNonEmptyText(signup.address, 200) &&
    isValidDate(signup.date) &&
    typeof signup.startTime === "string" &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(signup.startTime) &&
    Number.isFinite(signup.durationHours) &&
    signup.durationHours > 0 &&
    signup.durationHours <= 24 &&
    isNonEmptyText(signup.volunteerName, 70) &&
    isNonEmptyText(signup.email, 120) &&
    typeof signup.note === "string" &&
    signup.note.length <= 240;

const readSignups = () => {
    const seenIds = new Set();
    const seenOpportunityIds = new Set();

    return readList(storageKeys.signups).filter((signup) => {
        if (
            !isValidSignup(signup) ||
            seenIds.has(signup.id) ||
            seenOpportunityIds.has(signup.opportunityId)
        ) {
            return false;
        }

        seenIds.add(signup.id);
        seenOpportunityIds.add(signup.opportunityId);
        return true;
    });
};

const writeList = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
};

const App = () => {
    const [savedIds, setSavedIds] = useState(readSavedIds);
    const [signups, setSignups] = useState(readSignups);
    const [storageErrors, setStorageErrors] = useState({
        saved: false,
        signups: false,
    });
    const causeCount = new Set(
        volunteerOpportunities.map((opportunity) => opportunity.cause),
    ).size;

    const toggleSaved = (opportunityId) => {
        const nextSavedIds = savedIds.includes(opportunityId)
            ? savedIds.filter((id) => id !== opportunityId)
            : [opportunityId, ...savedIds];

        setSavedIds(nextSavedIds);
        const saved = writeList(storageKeys.saved, nextSavedIds);
        setStorageErrors((current) => ({ ...current, saved: !saved }));
    };

    const signUpForOpportunity = (opportunity, volunteer) => {
        const nextSignups = [
            {
                id:
                    globalThis.crypto?.randomUUID?.() ??
                    `${opportunity.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                opportunityId: opportunity.id,
                title: opportunity.title,
                organization: opportunity.organization,
                cause: opportunity.cause,
                location: opportunity.location,
                address: opportunity.address,
                date: opportunity.date,
                startTime: opportunity.startTime,
                durationHours: opportunity.durationHours,
                volunteerName: volunteer.name,
                email: volunteer.email,
                note: volunteer.note,
            },
            ...signups,
        ];

        setSignups(nextSignups);
        const saved = writeList(storageKeys.signups, nextSignups);
        setStorageErrors((current) => ({ ...current, signups: !saved }));
    };

    const cancelSignup = (signupId) => {
        const nextSignups = signups.filter((signup) => signup.id !== signupId);
        setSignups(nextSignups);
        const saved = writeList(storageKeys.signups, nextSignups);
        setStorageErrors((current) => ({ ...current, signups: !saved }));
    };

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.pageContent}>
                {storageErrors.saved || storageErrors.signups ? (
                    <p className={styles.storageWarning} role="status">
                        Your browser could not save this plan. Changes may be
                        lost when you close or reload this page.
                    </p>
                ) : null}
                <BoardIntro
                    openCount={volunteerOpportunities.length}
                    causeCount={causeCount}
                    plannedCount={signups.length}
                />
                <OpportunityBoard
                    opportunities={volunteerOpportunities}
                    savedIds={savedIds}
                    signups={signups}
                    onToggleSaved={toggleSaved}
                    onSignUp={signUpForOpportunity}
                />
                <MyShifts signups={signups} onCancelSignup={cancelSignup} />
                <HowItWorks />
            </main>
            <SiteFooter />
            <BackToTop />
        </div>
    );
};

export default App;
