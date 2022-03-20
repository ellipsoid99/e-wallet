import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <span className={`icon icon-Settings-alt ${styles.animate}`}></span>
        </div>
    );
};

export default Loader;
