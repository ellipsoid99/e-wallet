import { useState, useEffect } from "react";
import styles from "../Dashboard.module.scss";

const AccountOverview = (props) => {
    //  Date Time
    const locale = "en";
    const [today, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const day = today.toLocaleDateString(locale, { weekday: "long" });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
        locale,
        { month: "long" }
    )}\n\n`;
    const time = today.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: true,
        minute: "numeric",
        second: "numeric",
    });

    return (
        <>
            <div className={styles.darkBackground}>
                <div className={styles.content}>
                    <div className={styles.headingWrapper}>
                        <h3 className={styles.date}>{date}</h3>
                        <h3 className={styles.time}>{time}</h3>
                    </div>
                    <div className={styles.textWrapper}>
                        <h5>Welcome</h5>
                        <h3>
                            {props.data.firstname} {props.data.lastname}
                        </h3>
                        <h4>{props.data.accountnumber} </h4>
                        <p className={styles.message}>
                            Hope you're doing well!!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountOverview;
