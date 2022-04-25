import { useState } from "react";
import { Toast, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import styles from "./Payment.module.scss";

const PaymentForm = () => {
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [formData, updateFormData] = useState({
        from: localStorage.getItem("accountnumber"),
        to: "",
        amount: "",
    });
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        // ... submit to API
        const url = "/api/users/";
        const reqBody = qs.stringify({
            senderAccountNumber: formData.from,
            receiverAccountNumber: formData.to,
            amount: formData.amount,
        });
        console.log("inside payments", reqBody);
        const getData = () => {
            axios
                .post(`${url}payments`, reqBody)
                .then((res) => {
                    res && res?.status && console.log(res);
                    if (res.status === 200) {
                        setMessage("Payment Successfull");
                    } else if (res.status === 204)
                        setMessage(
                            "Payment Not Successful, Receiver not Found"
                        );
                })
                .catch((error) => console.error(`Errors: ${error}`));
        };
        getData();
        setShow(true);
    };
    return (
        <>
            <Toast
                className={styles.toast}
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
            >
                <Toast.Header className={styles.toastHeader}>
                    <strong className="me-auto">Acknowledgement</strong>
                </Toast.Header>
                <Toast.Body className={styles.toastBody}>{message}</Toast.Body>
            </Toast>
            <form>
                <div className={styles.header}>
                    <h3>PAYMENT FORM</h3>
                </div>
                <div className={styles.formBody}>
                    <input
                        type="text"
                        name="from"
                        placeholder="Payee..."
                        value={localStorage.getItem("accountnumber")}
                        readOnly
                        disabled
                    />{" "}
                    <input
                        type="text"
                        name="to"
                        placeholder="Make the payment to..."
                        onChange={handleChange}
                    />{" "}
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount to be sent..."
                        onChange={handleChange}
                    />
                    <div className={styles.buttonWrapper}>
                        <Button className="primary" onClick={handleSubmit}>
                            Pay Now
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PaymentForm;
