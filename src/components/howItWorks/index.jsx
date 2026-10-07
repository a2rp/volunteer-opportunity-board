import { FiCheckCircle, FiSearch, FiSun } from "react-icons/fi";
import styles from "./styles.module.css";

const steps = [
    {
        number: "01",
        title: "Choose a shift",
        description: "Find a cause, date, and place that work for your week.",
        Icon: FiSearch,
    },
    {
        number: "02",
        title: "Save your place",
        description: "Add your details and keep the plan on this device.",
        Icon: FiCheckCircle,
    },
    {
        number: "03",
        title: "Show up and help",
        description:
            "Your plan stays in My shifts, ready when the day arrives.",
        Icon: FiSun,
    },
];

const HowItWorks = () => (
    <section
        className={styles.howItWorks}
        id="how-it-works"
        aria-labelledby="how-it-works-title"
    >
        <div className={styles.heading}>
            <h2 id="how-it-works-title">A good way to get started.</h2>
            <p>Three simple steps make it easier to give your time locally.</p>
        </div>
        <div className={styles.steps}>
            {steps.map(({ number, title, description, Icon }) => (
                <article className={styles.step} key={number}>
                    <div className={styles.stepTop}>
                        <span>{number}</span>
                        <Icon aria-hidden="true" />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </article>
            ))}
        </div>
    </section>
);

export default HowItWorks;
