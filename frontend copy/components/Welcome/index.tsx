import React from "react";
import { useRouter } from "next/router";
import styles from "./Welcome.module.scss";
const WelcomeContainer = () => {
    const router = useRouter();
    return (
        <div className={styles.info}>
            Welcome Back
            <div>
                We have missed you. Get in and start managing your online
                selling like a champ!
            </div>
        </div>
    );
};

export default WelcomeContainer;
