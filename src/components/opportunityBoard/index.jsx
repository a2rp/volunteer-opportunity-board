import { useState } from "react";
import { FiHeart, FiSearch, FiSliders, FiX } from "react-icons/fi";
import OpportunityCard from "../opportunityCard/index.jsx";
import SignupModal from "../signupModal/index.jsx";
import styles from "./styles.module.css";

const dateOptions = [
    { value: "any", label: "Any date" },
    { value: "week", label: "This week" },
    { value: "weekend", label: "Weekend" },
];

const isWithinThisWeek = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const date = new Date(`${dateString}T12:00:00`);

    return date >= today && date < nextWeek;
};

const isWeekend = (dateString) => {
    const day = new Date(`${dateString}T12:00:00`).getDay();

    return day === 0 || day === 6;
};

const OpportunityBoard = ({
    opportunities,
    savedIds,
    signups,
    onToggleSaved,
    onSignUp,
}) => {
    const [search, setSearch] = useState("");
    const [cause, setCause] = useState("All causes");
    const [dateFilter, setDateFilter] = useState("any");
    const [savedOnly, setSavedOnly] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");

    const causes = [
        "All causes",
        ...new Set(opportunities.map((opportunity) => opportunity.cause)),
    ];

    const visibleOpportunities = opportunities.filter((opportunity) => {
        const searchText = [
            opportunity.title,
            opportunity.organization,
            opportunity.cause,
            opportunity.location,
            opportunity.summary,
        ]
            .join(" ")
            .toLowerCase();
        const matchesSearch = searchText.includes(search.trim().toLowerCase());
        const matchesCause =
            cause === "All causes" || opportunity.cause === cause;
        const matchesDate =
            dateFilter === "any" ||
            (dateFilter === "week" && isWithinThisWeek(opportunity.date)) ||
            (dateFilter === "weekend" && isWeekend(opportunity.date));
        const matchesSaved = !savedOnly || savedIds.includes(opportunity.id);

        return matchesSearch && matchesCause && matchesDate && matchesSaved;
    });

    const clearFilters = () => {
        setSearch("");
        setCause("All causes");
        setDateFilter("any");
        setSavedOnly(false);
    };

    const hasActiveFilters =
        search.trim() ||
        cause !== "All causes" ||
        dateFilter !== "any" ||
        savedOnly;

    const saveShift = (opportunityId) => {
        const wasSaved = savedIds.includes(opportunityId);
        onToggleSaved(opportunityId);
        setStatusMessage(
            wasSaved
                ? "Shift removed from your saved list."
                : "Shift saved for later.",
        );
    };

    const confirmSignup = (volunteer) => {
        onSignUp(selectedOpportunity, volunteer);
        setStatusMessage(`Added ${selectedOpportunity.title} to My shifts.`);
        setSelectedOpportunity(null);
    };

    return (
        <section
            className={styles.opportunityBoard}
            id="opportunities"
            aria-labelledby="opportunities-title"
        >
            <div className={styles.heading}>
                <div>
                    <p className={styles.sectionLabel}>
                        Choose your next shift
                    </p>
                    <h2 id="opportunities-title">
                        Good things happen when we show up.
                    </h2>
                    <p className={styles.description}>
                        Browse nearby ways to help. Every listing includes the
                        time, place, and people you will be joining.
                    </p>
                </div>
                <div className={styles.openCount} aria-live="polite">
                    <strong>{visibleOpportunities.length}</strong>
                    <span>shifts found</span>
                </div>
            </div>

            <div className={styles.filters}>
                <label className={styles.searchField}>
                    <span>Search shifts</span>
                    <span className={styles.inputWrap}>
                        <FiSearch aria-hidden="true" />
                        <input
                            type="search"
                            value={search}
                            placeholder="Try parks, food, or a group name"
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </span>
                </label>
                <label className={styles.selectField}>
                    <span>Cause</span>
                    <select
                        value={cause}
                        onChange={(event) => setCause(event.target.value)}
                    >
                        {causes.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                </label>
                <label className={styles.selectField}>
                    <span>Date</span>
                    <select
                        value={dateFilter}
                        onChange={(event) => setDateFilter(event.target.value)}
                    >
                        {dateOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    className={
                        savedOnly
                            ? styles.savedToggleActive
                            : styles.savedToggle
                    }
                    type="button"
                    aria-pressed={savedOnly}
                    onClick={() => setSavedOnly((saved) => !saved)}
                >
                    <FiHeart aria-hidden="true" />
                    Saved
                    <span>{savedIds.length}</span>
                </button>
            </div>

            <div className={styles.resultsLine}>
                <p>
                    <FiSliders aria-hidden="true" />
                    Showing <strong>
                        {visibleOpportunities.length}
                    </strong> of {opportunities.length} shifts
                </p>
                {hasActiveFilters ? (
                    <button type="button" onClick={clearFilters}>
                        Clear filters
                        <FiX aria-hidden="true" />
                    </button>
                ) : null}
            </div>

            {visibleOpportunities.length ? (
                <div className={styles.opportunityGrid}>
                    {visibleOpportunities.map((opportunity) => (
                        <OpportunityCard
                            key={opportunity.id}
                            opportunity={opportunity}
                            isSaved={savedIds.includes(opportunity.id)}
                            isSignedUp={signups.some(
                                (signup) =>
                                    signup.opportunityId === opportunity.id,
                            )}
                            onToggleSaved={saveShift}
                            onSignUp={setSelectedOpportunity}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <FiSearch aria-hidden="true" />
                    <h3>No shifts match those filters</h3>
                    <p>Try a different cause, date, or search.</p>
                    <button type="button" onClick={clearFilters}>
                        Show all shifts
                    </button>
                </div>
            )}

            <p
                className={styles.statusMessage}
                role="status"
                aria-live="polite"
            >
                {statusMessage}
            </p>

            {selectedOpportunity ? (
                <SignupModal
                    opportunity={selectedOpportunity}
                    onClose={() => setSelectedOpportunity(null)}
                    onSubmit={confirmSignup}
                />
            ) : null}
        </section>
    );
};

export default OpportunityBoard;
