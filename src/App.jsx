import BoardIntro from "./components/boardIntro/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { volunteerOpportunities } from "./data/volunteerOpportunities.js";
import styles from "./App.module.css";

const App = () => {
    const causeCount = new Set(
        volunteerOpportunities.map((opportunity) => opportunity.cause),
    ).size;

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.pageContent}>
                <BoardIntro
                    openCount={volunteerOpportunities.length}
                    causeCount={causeCount}
                    plannedCount={0}
                />
            </main>
        </div>
    );
};

export default App;
