import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <h1>Find a shift that fits.</h1>
        </main>
    </div>
);

export default App;
