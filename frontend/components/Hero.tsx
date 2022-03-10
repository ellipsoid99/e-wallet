import React from "react";
import styles from "../styles/components/Hero.module.scss";

const Carousal = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <h3 className={`display-1 ${styles.supertext}`}>
          BANK
          <span className={`text-muted`}>ABLE</span>
          &lt;/&gt;
          <br />
          <h4 className={styles.subtext}>
            Because we are able to deliver the banking experience you deserve
          </h4>
        </h3>
      </div>
    </React.Fragment>
  );
};

export default Carousal;
