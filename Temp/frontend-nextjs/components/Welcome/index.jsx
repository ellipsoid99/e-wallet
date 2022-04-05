import React from "react";
import { useRouter } from "next/router";
import styles from "./Welcome.module.scss";
import { useState } from "react";

const WelcomeContainer = () => {
  const [apiResponse, setApiResponse] = useState("");
  const router = useRouter();

  return (
    <React.Fragment>
      {apiResponse}
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

export default WelcomeContainer;
