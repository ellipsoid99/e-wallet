import styles from "./Welcome.module.scss";

const Welcome = () => {
    return (
        <>
            <div className={styles.welcomeContainer}>
                <img src="http://localhost:3000/logo.png" alt="logo" />

                <div className={styles.welcomeText}>
                    <b>Welcome</b> to your banking app
                    <span>
                        BANK{""}
                        <span>ABLE</span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Welcome;
