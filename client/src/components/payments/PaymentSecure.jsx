import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import PaymentForm from "./PaymentForm";
import styles from "./Payment.module.scss";

const PaymentSecure = () => {
    //  States
    const [sessionAvailable, setSessionAvailable] = useState(false);
    const [renderForm, setRenderForm] = useState(false);
    const [message, setMessage] = useState("");
    //  API CALL
    const baseUrl = "/api/users/";
    const reqBody = qs.stringify({
        accountnumber: localStorage.getItem("accountnumber"),
    });

    useEffect(() => {
        const sessionCheck = () => {
            axios
                .post(`${baseUrl}checksession`, reqBody)
                .then((res) => {
                    if (res && res?.data && res?.data?.data) {
                        setSessionAvailable(res?.data?.data?.session);
                        setMessage(res?.data?.data?.message);
                    }
                })
                .catch((error) => console.error(`Errors: ${error}`));
        };
        sessionCheck();
        const interval = setInterval(() => {
            sessionCheck();
        }, 1000);
        return () => clearInterval(interval);
    }, [reqBody]);

    const secureSession = () => {
        axios
            .post(`${baseUrl}securesession`, reqBody)
            .then((res) => {
                if (res && res?.data && res?.data?.data) {
                    if (res?.data?.data?.context_code === 1100) {
                        setSessionAvailable(false);
                        setRenderForm(false);
                        setMessage(res?.data?.data?.message);
                    } else if (res?.data?.data?.context_code === 1000) {
                        setSessionAvailable(true);
                        setRenderForm(true);
                        setMessage(res?.data?.data?.message);
                    }
                }
            })
            .catch((error) => console.error(`Errors: ${error}`));
    };

    const abortSession = () => {
        axios
            .post(`${baseUrl}abortsession`, reqBody)
            .then((res) => {
                if (res && res?.data && res?.data?.data) {
                    if (res?.data?.data?.context_code === 1000) {
                        setSessionAvailable(false);
                        setRenderForm(true);
                    }
                }
            })
            .catch((error) => console.error(`Errors: ${error}`));
    };

    const renderOrder = () => {
        if (sessionAvailable && renderForm) {
            return (
                <>
                    <div className={styles.wrapperHeader}>
                        <h2 className={styles.heading}>{message}</h2>
                    </div>
                    <PaymentForm />;
                </>
            );
        } else if (sessionAvailable && !renderForm) {
            return (
                <>
                    <div className={styles.wrapperHeader}>
                        <h2 className={styles.heading}>
                            Another Payment already Underway
                        </h2>
                    </div>
                    <div className={styles.wrapperBody}>
                        <p>
                            Do you wish to abort the other transaction and
                            secure another payment session?
                        </p>
                        <div className={styles.buttonWrapper}>
                            <button
                                className={styles.myButton}
                                onClick={abortSession}
                            >
                                Abort Session
                            </button>
                        </div>
                    </div>
                </>
            );
        } else
            return (
                <>
                    <div className={styles.wrapperHeader}>
                        <h2 className={styles.heading}>{message}</h2>
                    </div>
                    <div className={styles.wrapperBody}>
                        <div className={styles.buttonWrapper}>
                            <button
                                className={styles.myButton}
                                onClick={secureSession}
                            >
                                Secure Session
                            </button>
                        </div>
                    </div>
                </>
            );
    };
    return <>{renderOrder()}</>;
};

export default PaymentSecure;
