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

const readList = (key) => {
    try {
        const storedValue = localStorage.getItem(key);
        const parsedValue = storedValue ? JSON.parse(storedValue) : [];

        return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
        return [];
    }
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
    const [savedIds, setSavedIds] = useState(() => readList(storageKeys.saved));
    const [signups, setSignups] = useState(() => readList(storageKeys.signups));
    const causeCount = new Set(
        volunteerOpportunities.map((opportunity) => opportunity.cause),
    ).size;

    const toggleSaved = (opportunityId) => {
        const nextSavedIds = savedIds.includes(opportunityId)
            ? savedIds.filter((id) => id !== opportunityId)
            : [opportunityId, ...savedIds];

        setSavedIds(nextSavedIds);
        writeList(storageKeys.saved, nextSavedIds);
    };

    const signUpForOpportunity = (opportunity, volunteer) => {
        const nextSignups = [
            {
                id: `${opportunity.id}-${Date.now()}`,
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
        writeList(storageKeys.signups, nextSignups);
    };

    const cancelSignup = (signupId) => {
        const nextSignups = signups.filter((signup) => signup.id !== signupId);
        setSignups(nextSignups);
        writeList(storageKeys.signups, nextSignups);
    };

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.pageContent}>
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
