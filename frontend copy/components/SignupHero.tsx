import { Fragment } from "react";
import styles from "../styles/components/SignupHero.module.scss";
import SignUp from "./Signup";

const SignupHero = () => {
  return (
    <Fragment>
      <div className={styles["container"]}>
        <div className={styles["top-area"]}>
          {" "}
          <div className={styles["left-area"]}>
            <div className={styles["heading"]}>
              <p className={styles["text-para-1"]}>
                Let's Get <span className={styles["text-para-muted"]}>You</span>{" "}
                <br />
                <span
                  className={`${styles["text-para-2"]} ${styles["text-para-muted"]}`}
                >
                  Signed Up !!
                </span>
              </p>
            </div>
          </div>
          <div className={styles["right-area"]}>
            <SignUp />
          </div>
        </div>
        <div className={styles["bottom-area"]}></div>
      </div>
    </Fragment>
  );
};

export default SignupHero;
